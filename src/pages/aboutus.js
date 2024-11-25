import React, { useState } from "react";
import { Link } from "react-router-dom";

import bg3 from "../assect/images/2.png";
import heroImg from "../assect/images/digital_far.png";
import dots from "../assect/images/svg/dots.svg";
import image1 from "../assect/images/1.jpg";
import Certificate from "../assect/images/Certificate/CERTIFICATION OF INCORPORATION.png";
import Certificate1 from "../assect/images/Certificate/page1.png";
import Certificate2 from "../assect/images/Certificate/page2.png";
import Certificate3 from "../assect/images/Certificate/page3.png";
import PanCard from "../assect/images/Certificate/pa.jpeg";



import map from "../assect/images/map.png";

import About from "../components/about";

import GetInTuch from "../components/getInTuch";

import ModalVideo from "react-modal-video";
import "../../node_modules/react-modal-video/css/modal-video.css";

import CountUp from "react-countup";

export default function AboutUs() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <div className=" d-flex justify-content-center gap-3">
                  <div>
                    <Link to="/">
                      <p className="text-white-50 para-desc mx-auto mb-0">
                        Home
                      </p>
                    </Link>
                  </div>
                  <span className="text-white">/</span>
                  <div>
                    <Link to="/aboutus">
                      <p className="text-white para-desc mx-auto mb-0">
                        About Us
                      </p>
                    </Link>
                  </div>
                </div>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  About Us
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="about-left">
                <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
                  <img
                    src={heroImg}
                    className="img-fluid rounded-top-pill rounded-5"
                    alt=""
                  />

                  <div className="cta-video">
                    <Link
                      to="#!"
                      onClick={() => setOpen(true)}
                      className="avatar avatar-md-md rounded-pill shadow card d-flex justify-content-center align-items-center lightbox"
                    >
                      <i className="mdi mdi-play mdi-24px text-primary"></i>
                    </Link>
                  </div>
                  <ModalVideo
                    channel="youtube"
                    youtube={{ mute: 0, autoplay: 0 }}
                    isOpen={isOpen}
                    videoId="yba7hPeTSjk"
                    onClose={() => setOpen(false)}
                  />

                  <div className="position-absolute top-0 start-0 z-n1">
                    <img src={dots} className="avatar avatar-xl-large" alt="" />
                  </div>
                </div>

                <div className="img-two shadow rounded-3 overflow-hidden p-2 bg-white">
                  <img src={image1} className="img-fluid rounded-3" alt="" />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ms-lg-5">
                <h6 className="text-primary fw-medium mb-2">
                  Our story: GAMTLLP
                </h6>
                <h4 className="title mb-3">
                  Geet. <br /> Agro Multitrade.
                </h4>
                <p className="text-muted para-desc mb-0">
                  Geet Agro is revolutionizing the agricultural sector with an
                  innovative platform that empowers farmers and buyers to
                  connect seamlessly. By streamlining transactions, enhancing
                  cost transparency, and offering complete control, Geet Agro
                  brings efficiency and trust to the agricultural marketplace.
                  Geet Agro – Redefining Agriculture for a Sustainable Future.
                </p>

                <div className="mt-4">
                  <a
                    href="/docs/ UdyamRegistration.pdf"
                    target="_blank"
                    className="text-dark read-more"
                  >
                    Read More{" "}
                    <i className="mdi mdi-chevron-right align-middle"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mt-100 mt-60">
        <div className="section-title text-center mb-4 pb-2">
              <h4 className="title mb-3">GAMTLLP Certificate</h4>
              <p className="text-muted para-desc mb-0 mx-auto">
               UDYAM Registration Certificate
              </p>
            </div>
          <div class="row align-items-center d-flex">
            <div class="col-6 text-center border border-dark rounded">
              <img
                src={Certificate}
                alt="Left Decoration"
                class="img-fluid"
                style={{ height: "100vh;" }}
              />
            </div>

            <div class="col-6 text-center border border-dark rounded">
              <img
                src={Certificate1}
                alt="Right Decoration"
                class="img-fluid"
                style={{ height: "100vh;" }}
              />
            </div>
          </div>
        </div>

        <div class="container mt-100 mt-60">
          <div class="row align-items-center">
            <div class="col-6 text-center border border-dark rounded">
              <img
                src={Certificate2}
                alt="Left Decoration"
                class="img-fluid"
                style={{ height: "100vh;" }}
              />
            </div>

            <div class="col-6 text-center border border-dark rounded">
              <img
                src={Certificate3}
                alt="Right Decoration"
                class="img-fluid"
                style={{ height: "100vh;" }}
              />
            </div>
          </div>
        </div>
        <div class="container mt-100 mt-60">
          <div class="row align-items-center">
           

            <div class="col-12 text-center border border-dark rounded">
              <img
                src={PanCard}
                alt="Right Decoration"
                class="img-fluid"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <About />
        </div>

        <div className="container-fluid bg-building-pic mt-100 mt-60">
          <div
            className=" opacity-25 position-absolute w-100 h-100 top-0 start-0"
            style={{
              backgroundImage: `url(${map})`,
              backgroundPosition: "center",
            }}
          ></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col">
                <div className="section-title text-center mb-4 pb-2">
                  <h4 className="title mb-3">Trusted by more than 10K users</h4>
                  <p className="text-muted para-desc mb-0 mx-auto">
                    A great plateform to buy, sell and rent your properties
                    without any agent or commisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4 py-3">
                <div className="counter-box text-center">
                  <h1 className="mb-0 fw-semibold">
                    <CountUp start={0} end={1548} className="counter-value" />+
                  </h1>
                  <h6 className="counter-head text-muted fw-normal">
                    Investment
                  </h6>
                </div>
              </div>

              <div className="col-4 py-3">
                <div className="counter-box text-center">
                  <h1 className="mb-0 fw-semibold">
                    <CountUp start={0} end={25} className="counter-value" />+
                  </h1>
                  <h6 className="counter-head text-muted fw-normal">Awards</h6>
                </div>
              </div>

              <div className="col-4 py-3">
                <div className="counter-box text-center">
                  <h1 className="mb-0 fw-semibold">
                    <CountUp start={0} end={9} className="counter-value" />+
                  </h1>
                  <h6 className="counter-head text-muted fw-normal">
                    Profitability
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <GetInTuch />
        </div>
      </section>
    </>
  );
}
