import { cuteToast } from 'cute-alert';

export namespace Toast {
  export async function showFailure(
    event: string,
    message?: Error | string | unknown,
  ): Promise<void> {
    if (message instanceof Error) {
      message = message.message;
    }
    await cuteToast({
      type: 'error',
      title: `Failed to ${event}`,
      description: String(message ?? ''),
      timer: 5000,
      soundSrc: '/vendors/freesfx.co.uk/failure-short.mp3',
    });
  }
  export async function showSuccess(
    event: string,
    message?: string | unknown,
  ): Promise<void> {
    await cuteToast({
      type: 'success',
      title: `Succeeded to ${event}`,
      description: String(message ?? ''),
      timer: 1500,
      soundSrc: '/vendors/freesfx.co.uk/success-short.mp3',
    });
  }
}
