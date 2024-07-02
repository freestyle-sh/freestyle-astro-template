import { computed, map } from "nanostores";

const queriesLoading = map<{
  [method: string]: true | undefined;
}>({});

export function setLoading(query: any, loading: boolean) {
  queriesLoading.setKey(JSON.stringify(query), loading ? true : undefined);
}

export const $someLoading = computed(queriesLoading, (queries) =>
  Object.values(queries).some((loading) => loading)
);
