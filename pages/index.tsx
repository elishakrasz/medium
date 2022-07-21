import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { sanityClient } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  console.log('indians', posts)
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}

export default Home
