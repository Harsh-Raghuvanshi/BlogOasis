import React from "react";
import Profilecard from "./Profilecard";
const arrobj = [
  {
    key: "4",
    name: "Harsh Raghuvanshi",
    designation: "Web developer",
    intro:
      "Pursuing Information Technology currently in 3rd year ,Developer(MERN) of ExEngg website ",
    link: "https://www.linkedin.com/in/harsh-raghuvanshi-a89bb8232/",
    ourphoto: "harsh_raghu_photo",
    temp: "harsh_raghu_photo.jpeg",
  },
  {
    key: "1",
    name: "Harsh Sharma",
    designation: "App Developer",
    intro:
      "Pursuing Software Engneering currently in 3rd year , Developer(Flutter & Firebase) of ExEngg app ",
    link: "https://www.linkedin.com/in/harsh1224/",
    ourphoto: "harsh_sharma_photo",
    temp: "harsh_sharma_photo.jpeg",
  },
  {
    key: "2",
    name: "Harsh Kumar",
    designation: "UI/UX designer",
    intro:
      "Pursuing Software Engneering currently in 3rd year , Designed UI/UX for our App",
    link: "https://www.linkedin.com/in/harsh-kumar-38a14422a/",
    ourphoto: "harsh_kumar_photo",
    temp: "harsh_kumar_photo.jpeg",
  },
  {
    key: "3",
    name: "Harsh Nagar",
    designation: "DGM & Marketing",
    intro:
      "Pursuing Software Engneering currently in 3rd year , Manages all social media platform and Queries about exengg",
    link: "https://www.linkedin.com/in/harsh-nagar-77319722a/",
    ourphoto: "harsh_nagar_photo",
    temp: "harsh_nagar_photo.jpeg",
  },
];
const About = () => {
  return (
    <>
      <h1 className="center mb-4 fw-bolder">About Us</h1>

      <div className="container">
        <div className="row px-auto about_target">
          {arrobj.map((el, ind) => {
            return (
              <div className="col m-3">
                <Profilecard
                  key={ind}
                  id={el.key}
                  name={el.name}
                  designation={el.designation}
                  intro={el.intro}
                  link={el.link}
                  ourphoto={el.ourphoto}
                  temp={el.temp}
                />
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="intropara mx-5 my-5">
        <h1 className="center"> Who we are ?</h1>
        <p className="center">
          At Blogoasis, we are more than just a blogging platform; we are a
          community of passionate individuals who are dedicated to nurturing
          creativity and self-expression. Our journey began with a simple idea:
          to create a space where people from all walks of life could come
          together to share their stories, knowledge, and passions with the
          world. Our mission is to empower and inspire every member of our
          community to become confident bloggers and storytellers. We believe
          that every voice matters and that there is no limit to what can be
          achieved through the power of words. Whether you're a seasoned writer
          or a newcomer to the world of blogging, we are here to provide you
          with the tools, support, and resources you need to succeed.
          <h6 className="fw-bold fs-5 mt-3">What Sets Blogoasis Apart?</h6>
          <p className="m-1">
            1. Community: Join a warm and welcoming community of writers who
            share your passion for blogging. Exchange ideas, get feedback, and
            make new friends on your blogging journey.
          </p>
          <p className="m-1">
            2. User-Friendly: Our intuitive and user-friendly interface makes
            blogging a breeze. You don't need to be a tech genius to create
            stunning blog posts that captivate your audience.
          </p>
          <p className="m-1">
            3. Resources: Access a treasure trove of resources, tips, and
            tutorials to hone your blogging skills. From SEO optimization to
            content creation strategies, we've got you covered.
          </p>
          <p className="m-1">
            4. Diversity: Blogoasis embraces diversity in all forms. We
            encourage bloggers from all backgrounds, cultures, and experiences
            to share their unique perspectives and enrich our platform.
          </p>
        </p>
      </div>
    </>
  );
};
export default About;
