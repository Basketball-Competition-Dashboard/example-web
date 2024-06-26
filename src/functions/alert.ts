import { cuteAlert } from 'cute-alert';

export namespace Alert {
  export async function showFailure(
    event: string,
    message?: Error | string | unknown,
  ): Promise<void> {
    if (message instanceof Error) {
      message = message.message;
    }
    await cuteAlert({
      type: 'error',
      title: `Failed to ${event}`,
      description: String(message ?? ''),
      timer: 5000,
      primaryButtonText: 'OK',
      soundSrc: '/vendors/freesfx.co.uk/failure-short.mp3',
    });
  }
}
