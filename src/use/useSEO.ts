import { onMounted, onUnmounted, Ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const getMetaEl = (name: string) => {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) return el;

  const meta = document.createElement('meta');
  meta.name = name;
  document.querySelector('head')?.appendChild(meta);

  return meta;
};

const records: Record<string, boolean> = {};

export const useSEO = (args: {
  title?: Ref<string>;
  description?: Ref<string>;
  keywords?: Ref<string>;
}) => {
  let lastTitle = '';
  let lastDescription = '';
  let lastKeywords = '';

  const route = useRoute();

  onMounted(() => {
    const path = route.fullPath;
    if (records[path]) return;
    records[path] = true;

    const descriptionEl = getMetaEl('description');
    const keywordsEl = getMetaEl('keywords');

    lastTitle = document.title;
    lastDescription = descriptionEl.getAttribute('content') || '';
    lastKeywords = keywordsEl.getAttribute('content') || '';

    watchEffect(() => {
      if (args.title?.value) {
        document.title = args.title.value;
      }

      if (args.description?.value) {
        descriptionEl.setAttribute('content', args.description.value);
      }

      if (args.keywords?.value) {
        keywordsEl.setAttribute('content', args.keywords.value);
      }
    });
  });

  onUnmounted(() => {
    const path = route.fullPath;
    delete records[path];

    document.title = lastTitle;

    const descriptionEl = getMetaEl('description');
    descriptionEl.setAttribute('content', lastDescription);

    const keywordsEl = getMetaEl('keywords');
    keywordsEl.setAttribute('content', lastKeywords);
  });
};
