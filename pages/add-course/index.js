import React, { useEffect, useState} from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
  } from 'mdb-react-ui-kit';
import AddCategoryModal from '@/components/AddCategoryModal';
import { getAllCategories } from '../api/categories';
import { useFormik } from 'formik';
import validationSchema from '../validations/addCourseValidations';
import { addCourse } from '../api/courses';
import { useAuth } from '../contexts/authContext';

export default function AddCourse() {
  const [categories, setCategories]=useState([])
  const { user }=useAuth();

  useEffect(()=>{
    getAllCategories().then(data => {
      setCategories(data);
    }).catch(err => {
      console.log(err);
    });
  },[])

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues:{
      courseTitle:'',
      category:'',
      description:'',
    },
    onSubmit:(values,{resetForm})=>{
      addCourse(values,user?.id);
      resetForm();
    },
    validationSchema,
  })

  return (
    <>
    <Head>
      <title>VEDUS | Ders Ekle</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossOrigin="anonymous"/>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.css" rel="stylesheet" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js"></script>
    </Head>
    <Layout>
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ders Ekle :</h1>
            </div>
        </div>

        <div className="container py-4">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {/* Kişisel Bilgiler */}
              <MDBContainer>
                  <MDBRow>
                      <MDBCol lg="4">
                          <MDBCard className="mb-4">
                          <MDBCardBody className="text-center">
                              <div className="mx-auto flex flex-wrap">
                              <img alt="ecommerce" className="mx-auto object-cover object-center rounded border border-gray-200" src="https://images.unsplash.com/photo-1588702547981-5f8fed370e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"/>
                              </div>
                          </MDBCardBody>
                          </MDBCard>
                      </MDBCol>
                      <MDBCol lg="8">
                          <MDBCard className="mb-4">
                            <MDBCardBody>
                              <form onSubmit={handleSubmit}>
                                <MDBRow className='py-2'>
                                <input type="text" name="courseTitle" id="courseTitle" placeholder="Ders İlanı Başlık" value={values.courseTitle} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                {errors.courseTitle && touched.courseTitle && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.courseTitle}</div>)}
                                </MDBRow>
                                <hr />
                                <MDBRow className='py-2'>
                                  <select id="category" name="category" value={values.category} onChange={handleChange} onBlur={handleBlur} 
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option>Kategori Seçiniz</option>
                                        {categories?.map((category) => (
                                          <option key={category.id} value={category.id}>{category.category_name}</option>
                                        ))}
                                  </select>
                                  {errors.category && touched.category && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.category}</div>)}
                                </MDBRow>
                                <hr />
                                <MDBRow className='py-2'>
                                <textarea id="description" name="description" rows="10" value={values.description} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='İlan hakkında bir şeyler yaz...'></textarea>
                                {errors.description && touched.description && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.description}</div>)}
                                </MDBRow>
                                <MDBRow className='flex items-center justify-end gap-x-6'>
                                      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">
                                      Ekle
                                      </button>
                                </MDBRow>
                              </form>
                              <MDBRow className='py-2'>
                                <AddCategoryModal/>
                              </MDBRow>
                            </MDBCardBody>
                          </MDBCard>
                      </MDBCol>
                  </MDBRow>
              </MDBContainer>
          </div>
        </div>
      </section>
    </Layout>
  </>
  )
}