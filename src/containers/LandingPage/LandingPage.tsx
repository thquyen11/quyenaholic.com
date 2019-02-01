import * as React from "react";
import { connect } from "react-redux";
import "./LandingPage.scss";
import { generateDynamicSologan } from "./assets/dynamic_sologan";
import ProjectCard from '../../components/LandingPage/ProjectCard/ProjectCard';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const profilePic = require("./assets/img/profilePic.png");
import { INPUT_EMAIL, INPUT_SUBJECT, INPUT_BODY } from '../../constans';

interface StateProps {
  email: string,
  subject: string,
  body: string,
}

const mapStateToProps = (state: any): StateProps => {
  return {
    email: state.EmailContact.email,
    subject: state.EmailContact.subject,
    body: state.EmailContact.body,
  };
};

interface DispatchProps {
  updateEmailInput: any;
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    updateEmailInput: (type: string, payload: string) => {
      console.log(type, payload);
      dispatch({ type: type, payload: payload })
    }
  };
}

interface Props extends StateProps, DispatchProps {
}

/**
 * * Only write code in React predefined function (render, componentDidMount,etc...)
 * componentWillMount(): run only 1 time before initial rendering of React component
 * render(): run everytime the states are updated
 * componentDidMount(): run only 1 time after Reat component initial rendering
 */
class LandingPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  sendEmail(event: any) {
    event.preventDefault();
    fetch('http://localhost:3001/landing-page/contact-email', {
      method: 'POST',
      body: JSON.stringify({
        email: this.props.email,
        subject: this.props.subject,
        body: this.props.body,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((res: any) => {
      // TODO: popup window when email send ok
      res.status === 200 ? console.log('email sent') : console.log('email send failed');
    })
  }

  componentDidMount() {
    /**
     * Generate dynamic sologon on the header
     */
    const node: any = document.querySelector("#introduction");
    const sologan: any = [
      "A Financial Software Technical Analyst",
      "A Fullstack Web Developer",
      "An Enthusiastic Learner",
    ];
    generateDynamicSologan(sologan, node);
  }

  render() {
    /**
     * ProjectCards information list
     */
    const projects: any = [
      {
        id: "0",
        name: "RoboBrain",
        description: "Funny Robo lists and Face Detection from photo",
        year: "2018",
        photo: "./assets/img/RoboBrain.png",
        githubLink: "https://github.com/thquyen11/RoboBrain",
        Link: "",
      },
      {
        id: "1",
        name: "Devspace",
        description: "My workspace with Pomodoro clock, music and popular quotes",
        year: "2019",
        photo: "./assets/img/DevSpace.jpg",
        githubLink: "https://github.com/thquyen11/thquyen11.github.io/tree/master/src/containers/DevSpace",
        Link: "/projects/devspace",
      },
      {
        id: "2",
        name: "FXculator",
        description: "Up-to-date money exchange rate and historical graph",
        year: "2019",
        photo: "",
        githubLink: "https://github.com/thquyen11/thquyen11.github.io/tree/master/src/containers/FXculator",
        Link: "/project/fxculator",
      },
    ];

    return (
      <div>
        <div className="background-color-layer"></div>
        <main className="container">
          <header>
            <div className="text-center">
              <h1>Hello, I'm Quyen</h1>
              <h2 id="introduction"></h2>
              <p className="social-network">
                <a href="https://www.linkedin.com/in/quyen-ho-99173ba3/" target="blank">
                  <FontAwesomeIcon icon={["fab", "linkedin-in"]} size="2x" />
                </a>
                <a href="https://github.com/thquyen11" target="blank">
                  <FontAwesomeIcon icon={["fab", "github-square"]} size="2x" />
                </a>
                <a href="https://twitter.com/Quyen77672590" target="blank">
                  <FontAwesomeIcon icon={["fab", "twitter-square"]} size="2x" />
                </a>
                <a href="https://www.facebook.com/hquyen11" target="blank">
                  <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
                </a>
              </p>
            </div>
          </header>

          <div className="container">
            <div className="card" id="about-me-card">
              <h4>About me</h4>
              <div className="card-body">
                <div className="row">
                  <div className="container col-md-3" id="profile-pic">
                    <img src={profilePic} alt="my awesome profile picture" />
                  </div>
                  <div className="container col-md-8">
                    <p>Hi, I'm an experienced Murex consultant in Reporting, Datamart and End of Day (EOD)
                      , who also loves software development and data science. I'm recently building a blog
                      to share my experience, knowledge and learning path of my transition story from Oil&Gas
                      to IT sector. I'd love to learn data science and machine learning in order to combine my
                      passion for learning with financial engineering knowledge to explore the potential application
                      of this cutting-edge technology into banking industry
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" id="projects-card">
              <h4>Projects</h4>
              <div className="card-body">
                <div className="row justify-content-center">
                  {projects.map((project: any) => {
                    return <ProjectCard project={project} />;
                  })}
                </div>
              </div>
            </div>

            <div className="card" id="works-card">
              <div className="container">
                <div className="card col-md-3 d-inline-block">
                  <h6 className="card-subtitle mb-2 text-muted">2017-2015</h6>
                  <h5 className="card-title">Web developer</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card"s content.</p>
                </div>
              </div>
            </div>

            <div className="card" id="contact-card">
              <h5>Contact</h5>
              <form>
                <div className="form-group">
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" onChange={(event: any) => this.props.updateEmailInput(INPUT_EMAIL, event.target.value)} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" id="subject" placeholder="Subject" onChange={(event: any) => this.props.updateEmailInput(INPUT_SUBJECT, event.target.value)} />
                </div>
                <div className="form-group">
                  <textarea className="form-control" id="message" rows={3} onChange={(event: any) => this.props.updateEmailInput(INPUT_BODY, event.target.value)} required></textarea>
                </div>
                <input type="submit" className="btn btn-dark" onClick={(event: any) => this.sendEmail(event)} value="Send message" />
              </form>
            </div>
          </div>
        </main>

        <footer>
          <div className="container text-center">
            <p>All right reserved. Designed by QuyenHo</p>
            <p className="social-network">
              <a href="https://www.linkedin.com/in/quyen-ho-99173ba3/" target="blank">
                <FontAwesomeIcon icon={["fab", "linkedin-in"]} size="2x" />
              </a>
              <a href="https://github.com/thquyen11" target="blank">
                <FontAwesomeIcon icon={["fab", "github-square"]} size="2x" />
              </a>
              <a href="https://twitter.com/Quyen77672590" target="blank">
                <FontAwesomeIcon icon={["fab", "twitter-square"]} size="2x" />
              </a>
              <a href="https://www.facebook.com/hquyen11" target="blank">
                <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
              </a>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
