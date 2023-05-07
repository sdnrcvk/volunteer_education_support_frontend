import React, {useState} from 'react'
import { FaGlobe, FaLinkedin, FaInstagram } from "react-icons/fa";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Head from 'next/head'
import Layout from '@/components/Layout'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBListGroup,
    MDBListGroupItem,
  } from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import validationSchema from '../validations/editProfileValidations';

export default function EditProfile() {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("profileImage", file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const { handleSubmit, handleChange, values, errors, touched, handleBlur, isSubmitting, setSubmitting, resetForm, dirty,setFieldValue } = useFormik({
    initialValues:{
      profileImage:null,
      personalWebsite:'',
      instagram:'',
      linkedin:'',
      firstName:'',
      lastName:'',
      taskDefinition:'',
      birthdate:'',
      phone:'',
      gender:'',
      city:'',
      district:'',
      email:'',
      password:'',
      about:'',
    },
    onSubmit:values=>{
      console.log(values);
    },
    validationSchema,
  })

  return (
    <>
    <Head>
      <title>VEDUS | Profil Düzenle</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossOrigin="anonymous"/>
    </Head>
    <Layout>
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profil Düzenle :</h1>
          </div>
      </div>

      <div className="container py-4">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <MDBContainer>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <div className="col-span-full">
                          <label htmlFor="photo" className="block text-md font-medium leading-6 text-gray-900">
                              Profil Fotoğrafı
                          </label>
                          {preview && (
                            <img src={preview} alt="profile photo" width="200" className="m-auto"/>
                          )}
                          <div className=" flex items-center gap-x-3 mt-2">
                              <UserCircleIcon className="h-16 w-116 text-gray-300" aria-hidden="true" />
                              <input
                                type="file" onChange={(event) => handleFileChange(event, setFieldValue)}
                              />
                          </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                  
                  {/* Sosyal Medya Linkleri */}
                  <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody className="p-0">
                      <MDBListGroup className="rounded-3">
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-1">
                          <FaGlobe/>
                          <input type="text" name="personalWebsite" id="personalWebsite" placeholder="Kişisel Website"
                          value={values.personalWebsite} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 m-2"/>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-1">
                          <FaInstagram/>
                          <input type="text" name="instagram" id="instagram" placeholder="İnstagram" value={values.instagram} onChange={handleChange} onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 m-2"/>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-1">
                          <FaLinkedin/>
                          <input type="text" name="linkedin" id="linkedin" placeholder="Linkedin" value={values.linkedin} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ml-2"/>
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                {/* Kişisel Bilgiler */}
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                      <input type="text" name="firstName" id="firstName" placeholder="Ad" value={values.firstName} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                      <input type="text" name="lastName" id="lastName" placeholder="Soyad" value={values.lastName} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      </MDBRow>
                      <hr/>
                      <MDBRow>
                      <input type="text" name="taskDefinition" id="taskDefinition" placeholder="Görev Tanımı" value={values.taskDefinition} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                      <input type="date" name="birthdate" id="birthdate" placeholder="Doğum Tarihi" value={values.birthdate} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                      <input type="tel" name="phone" id="phone" placeholder="(0___) ___ __ __" value={values.phone} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" maxLength={11}/>
                      {errors.phone && touched.phone && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.phone}</div>)}
                      </MDBRow>
                      <hr />
                      <MDBRow>
                      <div className="py-1.5 grid grid-cols-1 gap-y-8 sm:grid-cols-6">
                          Cinsiyet :
                          <div className="flex items-center gap-x-3">
                          <input
                              id="female"
                              name="gender"
                              value="female"
                              type="radio"
                              onChange={handleChange} checked={values.gender==="female"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor="push-everything" className="block text-sm leading-6 text-gray-900">
                              Kadın
                          </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                          <input
                              id="male"
                              name="gender"
                              value="male"
                              type="radio"
                              onChange={handleChange} checked={values.gender==="male"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor="push-email" className="block text-sm leading-6 text-gray-900">
                              Erkek
                          </label>
                          </div>
                      </div>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                      <div className="py-1.5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                          <label htmlFor="city" className="sr-only">Şehir</label>
                          <div>
                              <select id="city" name="city" value={values.city} onBlur={handleBlur} onChange={handleChange}
                              className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <option>İl Seçiniz</option>
                              <option>Tokat</option>
                              <option>Karabük</option>
                              </select>
                          </div>
                          </div>
                          <div className="sm:col-span-3">
                          <label htmlFor="district" className="sr-only">İlçe</label>
                          <div>
                              <select id="district" name="district" value={values.city} onBlur={handleBlur} onChange={handleChange}
                              className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <option>İlçe Seçiniz</option>
                              <option>Merkez</option>
                              </select>
                          </div>
                          </div>
                      </div>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                      <input type="email" name="email" id="email" placeholder="E-mail" value={values.email} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      {errors.email && touched.email && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.email}</div>)}
                      </MDBRow>
                      <hr />
                      <MDBRow>
                      <input type="password" name="password" id="password" placeholder="Şifre" value={values.password} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      {errors.password && touched.password && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.password}</div>)}
                      </MDBRow>
                      <hr />
                      <MDBRow>
                      <textarea id="about" name="about" rows="3" value={values.about} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='Kendin hakkında bir şeyler yaz...'></textarea>
                      </MDBRow>
                      <div className="mt-6 flex items-center justify-end gap-x-6" >
                        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">
                          Kaydet
                        </button>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBContainer>
        </div>
      </div>
    </section>
    </Layout>
  </>
  )
}
