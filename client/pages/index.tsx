import { GetStaticProps, GetServerSideProps } from 'next';

const API_ROOT = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3000'
  : process.env.API_ROOT;

export const getServerSideProps: GetServerSideProps = async () => {
  const hello = await (await fetch(API_ROOT + '/hello')).text();
  const world = await (await fetch(API_ROOT + '/world')).text();

  return {
    props: {
      hello,
      world,
    },
  };
};

type Props = {
  hello: string;
  world: string;
};

const Index = ({ hello, world }: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {`${hello} ${world}`}
      </div>
    </main>
  );
};

export default Index;
