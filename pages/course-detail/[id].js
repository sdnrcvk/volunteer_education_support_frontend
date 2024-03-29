import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import EditCourseDetailModal from '@/components/EditCourseDetailModal';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { confirmCourse, getCourseDetailByCourseId } from '../api/courses';
import { addReceivedCourse } from '../api/receivedCourses';
import { useAuth } from '../contexts/authContext';
import { FaCheck } from "react-icons/fa";

export default function CourseDetail() {
  const [courseDetail,setCourseDetail]=useState()
  const router = useRouter()
  const { id } = router.query
  const {user}=useAuth();

  useEffect(()=>{
    if(id){
      getCourseDetailByCourseId(id).then(data => {
        console.log(data);
        setCourseDetail(data);
      }).catch(err => {
        console.log(err);
      });
    }
  },[id])
  
  return (
    <>
    <Head>
      <title>VEDUS | Özel Ders</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossOrigin="anonymous"/>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.css" rel="stylesheet" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js"></script>
    </Head>
    <Layout>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"/>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{courseDetail?.user?.name}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{courseDetail?.title}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Değerlendirme</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    {courseDetail?.category?.category_name}
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
                {courseDetail?.description}
              </p>
              <div className="flex mt-6 items-center pt-2 border-t-2 border-gray-200">
                <span className="title-font font-medium text-2xl text-gray-900">0 ₺</span>
                {user && ( 
                <>
                <a href={"mailto:"+courseDetail?.user?.email} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">İletişime Geç</a>
                <button className="rounded-full w-10 h-10 bg-red-200 p-0 border-0 inline-flex items-center justify-center hover:bg-red-300 hover:text-red-600 text-gray-500 ml-4" onClick={()=>addReceivedCourse(user?.detail.user_id,id)}>
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
                </>
                )}
                {user && user.detail && user.detail.user_type==="admin" && (
                  <>
                    <EditCourseDetailModal courseId={id}/>
                    <button className="rounded-full w-10 h-10 bg-green-200 p-0 border-0 inline-flex items-center justify-center hover:bg-green-300 hover:text-green-600 text-gray-500 ml-4" onClick={()=>confirmCourse(id)}>
                      <FaCheck className="w-5 h-5"/>
                    </button>                  
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  </>
  )
}
