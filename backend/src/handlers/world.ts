import type { Handler } from 'aws-lambda';

export const handle: Handler = async (event, context) => {
    return 'world';
};
