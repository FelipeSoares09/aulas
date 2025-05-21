import { Header } from './components/Header.tsx';
import { Post, PostType } from './components/Post.tsx';
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';

import './global.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/FSDeveloper09.png',
      name: 'Felipe Soares',
      role: 'Developer @ Talk2Buy',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋', },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀', },
      { type: 'paragraph', content: 'jane.design/doctorcare', },
    ],
    publishedAt: new Date('2022-05-03 20:00:00'),
  },

  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/FSDeveloper09.png',
      name: 'Anderson Costa',
      role: 'Developer @ Talk2Buy',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋', },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀', },
      { type: 'paragraph', content: 'jane.design/doctorcare', },
    ],
    publishedAt: new Date('2025-04-10 20:00:00'),
  },
]

export function App() {

  return (
  
  <div>
    <Header />

    <div className={styles.wrapper}>
        
      <Sidebar />
      
      <main>
        {posts.map(post=> {
          return (
          <Post
          key={post.id} 
          post={post}
        />
        )
       })}
      </main>
    </div>
   </div>
  )
}


