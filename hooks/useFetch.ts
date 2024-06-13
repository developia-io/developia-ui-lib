export const useFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
  defaultData?: any
) => {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}${input}`,
    //   init
    // );

    // if (!response.ok) {
    //   throw response;
    // }

    // return await response.json();

    return new Promise((resolve) => {
      setTimeout(() => resolve(defaultData), 1);
    });
  } catch (error) {
    throw error;
  }
};
