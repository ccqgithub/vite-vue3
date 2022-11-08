import { PropType } from 'vue';
import { GeneralError, TypeFromProps } from '@/utils';

export const VErrorWrapperProps = {
  error: {
    type: Object as PropType<GeneralError | null>,
    default: null
  }
};

export type ErrorWrapperProps = TypeFromProps<typeof VErrorWrapperProps>;
