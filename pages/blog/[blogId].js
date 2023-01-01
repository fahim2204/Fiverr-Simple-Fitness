import { useRouter } from "next/router";

function BlogByID() {
  const router = useRouter();
  const { blogId } = router.query;
  return <>Blog By id {blogId}</>;
}

export default BlogByID;
