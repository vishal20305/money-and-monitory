import React from "react";
import logo from "../../assets/logo.png";

export const Nav20DataSource = {
  isScrollLink: true,
  wrapper: {
    className: "header2 home-page-wrapper",
    style: { background: "#271745" },
  }, // Purple background
  page: { className: "home-page lncnpbhpr7a-editor_css" },
  logo: {
    className: "header2-logo",
    children: logo,
  },
  LinkMenu: {
    className: "header2-menu",
    children: [
      {
        name: "linkNav",
        to: "/login",
        children: (
          <span style={{ fontSize: "25px" }}>Login</span>
        ),
        className: "menu-item", 
      },
    ],
  },
  
  mobileMenu: { className: "header2-mobile-menu" },
};
export const Banner20DataSource = {
  wrapper: { className: "banner2" },
  BannerAnim: {
    children: [
      {
        name: "elem0",
        BannerElement: { className: "banner-user-elem" },
        page: { className: "home-page banner2-page" },
        textWrapper: { className: "banner2-text-wrapper" },
        bg: { className: "bg bg0" },
        title: {
          className: "banner2-title",
          children: (
            <span>
              <span>
                <p>NatWest</p>
              </span>
            </span>
          ),
        },
        content: {
          className: "banner2-content",
          children: (
            <span>
              <span>
                <span>
                  <h2 style={{ marginTop: "-30px" }}>
                    To Save and Invest, Talk to NatWest
                  </h2>{" "}
                  {/* Adjust the margin-top as needed */}
                </span>
              </span>
            </span>
          ),
        },

        button: {
          className: "banner2-button lnc4vw9fg5k-editor_css",
          children: (
            <a
              href="https://natwest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          ),
        },
        
      },
    ],
  },
};
export const Content00DataSource = {
  wrapper: { className: "home-page-wrapper content0-wrapper" },
  page: { className: "home-page content0" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      {
        name: "title",
        children: (
          <span>
            <p>Why Should you bank with us?</p>
          </span>
        ),
      },
    ],
  },
  childWrapper: {
    className: "content0-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://static.vecteezy.com/system/resources/previews/023/916/134/original/cash-get-a-bank-card-purple-white-background-icon-isolated-cashback-service-and-online-money-refund-concept-of-transfer-money-e-commerce-saving-account-vector.jpg",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: (
                <span>
                  <p>Default Savings</p>
                </span>
              ),
            },
            {
              name: "content",
              children: (
                <span>
                  <p>
                    We ensure that you are equipped with a savings account from
                    the get go!
                  </p>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: "block1",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://img.freepik.com/premium-vector/3d-money-bag-with-dollar-icon-cash-interest-rate-business-finance-vector-illustration_132477-327.jpg?w=2000",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: (
                <span>
                  <p>Personalized Experience</p>
                </span>
              ),
            },
            {
              name: "content",
              children: (
                <span>
                  <span>
                    <span>
                      <p>Choose how much money you want to round off</p>
                    </span>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: "block2",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://img.freepik.com/premium-vector/3d-money-bag-with-dollar-icon-cash-interest-rate-business-finance-vector-illustration_132477-327.jpg?w=2000",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: (
                <span>
                  <p>Visible Increase</p>
                </span>
              ),
            },
            {
              name: "content",
              children: (
                <span>
                  <p>
                    Little drops make the mighty ocean. See visible increase in
                    your savings
                  </p>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: "block1",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://static.vecteezy.com/system/resources/previews/023/916/134/original/cash-get-a-bank-card-purple-white-background-icon-isolated-cashback-service-and-online-money-refund-concept-of-transfer-money-e-commerce-saving-account-vector.jpg",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: (
                <span>
                  <p>Debit and Credit</p>
                </span>
              ),
            },
            {
              name: "content",
              children: (
                <span>
                  <span>
                    <span>
                      <p>Choose how much money you want to Debit and Credit</p>
                    </span>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
    ],
  },
};
export const Content10DataSource = {
  wrapper: { className: "home-page-wrapper content1-wrapper" },
  OverPack: { className: "home-page content1", playScale: 0.3 },
  imgWrapper: { className: "content1-img", md: 10, xs: 24 },
  img: {
    children: "https://cdn3.emoji.gg/emojis/6312-natwest.png",
  },
  textWrapper: { className: "content1-text", md: 14, xs: 24 },
  title: { className: "content1-title", children: "" },
  content: {
    className: "content1-content",
    children: "Lorem ipsum...............",
  },
};
export const Content40DataSource = {
  wrapper: { className: "home-page-wrapper content4-wrapper" },
  page: { className: "home-page content4" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      {
        name: "title",
        children: (
          <span>
            <span>
              <span>
                <p>Hear what our CEO has to say!</p>
              </span>
            </span>
          </span>
        ),
        className: "title-h1",
      },
      {
        name: "content",
        className: "title-content content4-title-content",
        children: (
          <span>
            <p>Paul Thwaite, CEO</p>
          </span>
        ),
      },
    ],
  },
  video: {
    className: "content4-video",
    children: {
      video: "",
      image:
        "https://www.natwestgroup.com/content/dam/natwestgroup_com/natwestgroup/images/board-photos/image.dim.480.Paul-Thwaite-Profile-ColourBG-Photo-445x275.png",
    },
  },
};
export const Footer10DataSource = {
  wrapper: {
    className: "home-page-wrapper footer1-wrapper",
    style: { background: "#271745" },
  }, // Purple background
  OverPack: { className: "footer1", playScale: 0.2 },
  block: {
    className: "home-page",
    gutter: 0,
    children: [
      {
        name: "block0",
        xs: 24,
        md: 6,
        className: "block",
        title: {
          className: "logo",
          children: "",
        },
        childWrapper: {
          className: "slogan",
          children: [
            {
              name: "content0",
              children: (
                <span
                  style={{ display: "flex", gap: "100px", fontSize: "22px" }}
                >
                  <a
                    href="https://www.natwest.com/support-centre.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Support
                  </a>
                  <a
                    href="https://www.natwest.com/banking-with-natwest/natwest-app.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Online Banking
                  </a>
                  <a
                    href="https://www.natwest.com/learning.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learning with Natwest
                  </a>
                  <a
                    href="https://www.natwest.com/banking-with-natwest/natwest-app.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Banking with Natwest
                  </a>
                  <a
                    href="https://natwest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bank Accounts
                  </a>
                </span>
              ),
            },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: "copyright-wrapper" },
  copyrightPage: { className: "home-page" },
  copyright: {
    className: "copyright",
    children: (
      <span>
        ©2023 by <a href="https://natwest.com">NatWest</a> All Rights Reserved
      </span>
    ),
  },
};


