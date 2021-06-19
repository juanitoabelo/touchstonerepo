import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';
import { useForm } from "react-hook-form"
import { Link } from 'gatsby';
import Auth, { Group } from '../components/Auth';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { EvaIcon } from '@paljs/ui/Icon';
import { breakpointDown } from '@paljs/ui/breakpoints';

import { handleLogin, isLoggedIn } from "../components/services/auth"


import axios from 'axios';

const LoginStyle = styled.section`
  max-width: 390px;
  &.custom-form {
    background-color: rgba(255,255,255,0.7);
    padding: 1rem;
    margin: 0 auto;
    -webkit-box-shadow: 0 0.6rem 1.6rem rgba(0, 0, 0, 0.25);
    box-shadow: 0 0.6rem 1.6rem rgba(0, 0, 0, 0.25);
    border-radius: .4rem;
  }
  &.custom-form h1 {
      margin-bottom: 0rem;
  }
  &.custom-form .form-wrapper {
    border: 1px solid rgba(121, 124, 127, 0.5);
    background-color: rgba(255,255,255,0.5);
  }
  &.custom-form .form-wrapper > div {
    border: none;
    background-color: transparent;
    box-shadow: none !important;
  }
  &.custom-form .login-brand img {
    // max-width: 220px;
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    padding: 1rem 0 0.5rem 0;
    margin: 0 auto;
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }
  &.custom-form .form-wrapper .login-brand {
    display: block;
    text-align: center;
    margin: 0 auto 1rem;
  }

  &.custom-form .form-wrapper .login-heading {
    text-align: center;
    margin: 0 auto 1rem;
    color: #363b3f;
  }
  .login-body * {
    color: #363b3f;
  }
  &.custom-form .form-wrapper .login-heading span.admin {
    font-family: "Roboto", sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
  }
  
  .custom-form .forgot {
    font-family: "Roboto", sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    font-style: italic;
    text-align: center;
  }
  .custom-form .forgot a {
    color: #c7a34a;
  }
  
  .custom-form .form-wrapper .form-group:not(:nth-of-type(3)) {
    margin-bottom: 1.5rem;
  }
  .custom-form .form-wrapper label {
    font-weight: 400;
    display: inline-block;
    margin-bottom: .8rem;
  }

  .form-wrapper .form-group {
    margin-bottom: 1rem;
  }
.form-wrapper .form-group .font-icon {
  position: absolute;
  width: 30px;
  height: 35px;
  font-size: 1.4rem;
  color: #fff;
  background-color: rgba(121, 124, 127, 0.5);
  border-radius: 0;
  bottom: 0;
  left: 0;
}
.form-wrapper .form-group .form-control {
  width: 100%;
  padding: .6rem 0.8rem .6rem 2.2rem;
  border: 1px solid rgba(121, 124, 127, 0.5) !important;
  border-color: rgba(121, 124, 127, 0.5) !important;
  position: relative;
  height: 35px;
  font-size: 0.8rem;
  line-height: 1;
  color: rgba(121, 124, 127, 1) !important;
  background-color: #fff!important;
  border-radius: 0;
}
.form-wrapper .form-group svg {
    width: 20px;
    left: 5px;
    position: relative;
}

${breakpointDown('sm')`

`}

  @media (min-width: 768px) {
    .custom-form .form-wrapper input {
      font-size: 1.6rem;
    }
  }
  .custom-form .form-wrapper input {
    width: 100%;
    padding: .6rem 0.8rem .6rem 2.2rem;
    border: 1px solid rgba(121, 124, 127, 0.5) !important;
    border-color: rgba(121, 124, 127, 0.5) !important;
    position: relative;
    height: 35px;
    font-size: 0.8rem;
    line-height: 1;
    color: rgba(121, 124, 127, 0.5) !important;
    background-color: #fff!important;
    border-radius: .3rem;
  }
  
  .custom-form .form-wrapper .form-group i {
    position: absolute;
    width: 30px;
    height: 35px;
    font-size: 1rem;
    color: #fff;
    background-color: rgba(121, 124, 127, 0.5) !important;
    border-radius: 0;
    bottom: 0;
    left: 0;
  }
  .custom-form .form-wrapper .form-group i::before {
    position: relative;
    top: 0.6rem;
    left: 0.6rem;
  }
  
  .custom-form .form-wrapper  button,
  .custom-form .form-wrapper  input[type="submit"] {
    color: #fff !important;
    margin: 0.5rem auto;
  }
  
  .login-link a {
    color: #c7a34a !important;
  }

  .form-wrapper > div {
    height: inherit !important;
  }
`;

// Display Video
var EmbedVideo = function(props) {
  return (
      <div dangerouslySetInnerHTML={{ __html: `
       <video
         loop
         muted
         autoplay
         playsinline
         src="${props.src}"
         class="${props.className}"
         id="${props.id}"
       />,
     ` }}></div>
  )
}



export default function Login() {

  const onClickLogin = () => {
    // Hides the Login link and Displays the Login Form
    document.getElementById('login-shortcut').classList.add("d-none");
    document.getElementById('login-form').classList.remove("text-animation");
    
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const onSubmit = data => console.log(data);

  const handlePost = (formData) => {

    // console.log("Username: "+formData.user);
    // console.log("Password: "+formData.pass);
    
     axios.get('https://touchstone-api.abelocreative.com/touchstone-ajax/ajax.php', {
      params: {
        username: formData.user,
        password: formData.pass,
        tblName: 'tblUsers',
        queryType: 'getUserLogin'
      }
    })
    .then(function (response) {
      //  console.log('Data Company Id: '+ response.data.username);
      handleLogin({username:response.data.username, password: response.data.password, companyid: response.data.companyid } );

      const isBrowser = typeof window !== "undefined"
      if (isLoggedIn() && isBrowser) {
           window.location.href="/dashboard"
      }

    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      // always executed
      console.log(response,`successfull`);
    });  

  }

  return (
    <>
    <div>
      <EmbedVideo src="/electronic-circuit-board-with-artificial-intellige-M7S9W3B.mp4" id="main-video" className="video-fluid"></EmbedVideo>

      <section id="front-page-content" className="d-flex content position-fixed w-100 h-100 justify-content-center align-items-center">
          <div className="container">
				    <div className="row justify-content-center align-items-center mx-auto">
					    <div className="col-md-8 col-lg-6">

              <LoginStyle id="login-form" className="custom-form login-body mx-auto rounded mb-4 text-animation  position: relative;">

                <div className="form-wrapper rounded">
                <Auth title="SIGN IN" subTitle="TO TOUCHSTONE ADMIN">
                
                    {/* <form onSubmit={handleSubmit(handlePost)} method="post" action="/login/" name="contact-form" id="contact-form"> */}
                    <form onSubmit={handleSubmit(handlePost)}>

                      <InputGroup fullWidth className="d-block position-relative form-group">
                        <label className="control-label d-block">Username</label>
                        <input className="form-control" {...register("user", { required: true })} />
                          <EvaIcon name="person" className="font-icon"/>
                      </InputGroup>
                      <span className="error">{errors.user?.type === 'required' && "Username is required"}</span>

                      <InputGroup fullWidth className="d-block position-relative form-group">
                          <label className="control-label d-block">Password</label>
                          <input className="form-control" {...register("pass", { required: true })} />
                        <EvaIcon name="lock" className="font-icon"/>
                      </InputGroup>
                      <span className="error">{errors.pass?.type === 'required' && "Password is required"}</span>
                      
                      <Button status="Success" type="submit" shape="SemiRound" fullWidth className="mt-3">Login</Button>
                      
                      <Group className="text-center mt-0">
                        <Link to="/" className="d-block mx-auto forgot mb-2 mt-0">Forgot Password?</Link>
                      </Group>
                      
                    </form>
                  </Auth> 
                </div>

                </LoginStyle>
                <p id="login-shortcut" className="login-link mb-2 text-center"><a className="" href="#" onClick={ onClickLogin } title="Login">Login</a></p>	

              </div>
            </div>
          </div>
      </section>
    
    </div>
    </>
  );
}