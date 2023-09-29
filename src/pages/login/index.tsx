import type { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

import useSettings from '~/utils/hooks/useSettings';
import { SettingsFields } from '~/components/settings-context';

import InputWithError from '~/components/input-with-error';
import ButtonWithLoading from '~/components/button-with-loading';

export default function LogIn() {
  const nameValidator = api.name.validate.useMutation();
  const router = useRouter();
  const [_, setSettings] = useSettings();

  const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      await nameValidator.mutateAsync({ name: formData.get('name') as string });
      setSettings((current) => {
        return { ...current, name: formData.get('name') as string };
      }, SettingsFields.NAME);

      await router.push('/');
    } catch {}
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={OnSubmit} // eslint-disable-line
        className="flex h-3/5 w-2/5 flex-col items-center justify-around gap-2 rounded-lg border border-[--bor-m] bg-black bg-opacity-10 px-8 py-16 backdrop-blur-2xl lg:px-32"
      >
        <span className="w-max cursor-default text-2xl text-[--fnt-m]">
          Name yourself
        </span>
        <InputWithError
          name="name"
          animate
          placeholder="Be creative!"
          className="w-full"
          maxLength={20}
          error={nameValidator.error?.data?.zodError?.fieldErrors.name?.at(0)}
        />
        <ButtonWithLoading type="submit" loading={nameValidator.isLoading}>
          Done
        </ButtonWithLoading>
      </form>
    </div>
  );
}
