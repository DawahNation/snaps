import {
  PermissionSpecificationBuilder,
  PermissionType,
  ValidPermissionSpecification,
  SubjectType,
  RestrictedMethodOptions,
} from '@metamask/permission-controller';
import { NonEmptyArray } from '@metamask/utils';

import { MethodHooksObject } from '../utils';

const methodName = 'wallet_getLocale';

export type GetLocaleMethodHooks = {
  getLocale: () => Promise<string>;
};

type SpecificationBuilderOptions = {
  allowedCaveats?: Readonly<NonEmptyArray<string>> | null;
  methodHooks: GetLocaleMethodHooks;
};

type Specification = ValidPermissionSpecification<{
  permissionType: PermissionType.RestrictedMethod;
  targetName: typeof methodName;
  methodImplementation: ReturnType<typeof getImplementation>;
  allowedCaveats: Readonly<NonEmptyArray<string>> | null;
}>;

/**
 * The specification builder for the `wallet_getLocale` permission.
 * `wallet_getLocale` allows snaps to get the user selected locale.
 *
 * @param options - The specification builder options.
 * @param options.allowedCaveats - The optional allowed caveats for the permission.
 * @param options.methodHooks - The RPC method hooks needed by the method implementation.
 * @returns The specification for the `wallet_getLocale` permission.
 */
export const specificationBuilder: PermissionSpecificationBuilder<
  PermissionType.RestrictedMethod,
  SpecificationBuilderOptions,
  Specification
> = ({ allowedCaveats = null, methodHooks }: SpecificationBuilderOptions) => {
  return {
    permissionType: PermissionType.RestrictedMethod,
    targetName: methodName,
    allowedCaveats,
    methodImplementation: getImplementation(methodHooks),
    subjectTypes: [SubjectType.Snap],
  };
};

const methodHooks: MethodHooksObject<GetLocaleMethodHooks> = {
  getLocale: true,
};

export const getLocaleBuilder = Object.freeze({
  targetName: methodName,
  specificationBuilder,
  methodHooks,
} as const);

/**
 * Builds the method implementation for `wallet_getLocale`.
 *
 * @param hooks - The RPC method hooks.
 * @param hooks.getLocale - A function that returns the user selected locale.
 * @returns The user selected locale.
 */
export function getImplementation({ getLocale }: GetLocaleMethodHooks) {
  return async function implementation(
    _args: RestrictedMethodOptions<void>,
  ): Promise<string> {
    return getLocale();
  };
}
