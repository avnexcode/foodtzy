import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { type LoginFormSchema } from '../types';
import type { ApiProps } from '@/types/api';
import { AxiosError } from 'axios';

export const useLogin = ({ onSuccess, onError }: ApiProps) => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (
            values: LoginFormSchema & { callbackUrl: string },
        ) => {
            const response = await signIn('credentials', {
                redirect: false,
                ...values,
            });

            if (response?.error) {
                throw new AxiosError('Invalid email or password');
            }

            return response;
        },
        onSuccess,
        onError,
    });
};
