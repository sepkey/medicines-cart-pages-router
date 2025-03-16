import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/1",
      permanent: false,
    },
  };
};

export default function IndexRedirect() {
  return null;
}
