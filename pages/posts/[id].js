import Head from "next/head";
import Date from '../../components/Date';
import Layout from "../../components/Layout";
import utilStyles from '../../styles/Utils.module.css';
import { getAllPostsIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXL}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

// Return list of all posible values for id
export async function getStaticPaths() {
    const paths = getAllPostsIds();
    return {
        paths,
        fallback: false
    }
}

// Fetch necessary data for the blog post using params.id
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}