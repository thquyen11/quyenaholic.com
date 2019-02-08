import * as React from "react";
import { connect } from "react-redux";
import "./LandingPage.scss";
import { generateDynamicSologan } from "./assets/dynamic_sologan";
import ProjectCard from '../../components/LandingPage/ProjectCard/ProjectCard';
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const profilePic = require("./assets/img/profilePic.png");
import { INPUT_EMAIL, INPUT_SUBJECT, INPUT_BODY } from '../../constans';
import Navbar from "../../components/Navbar/Navbar";

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
    const projects: any[] = [
      {
        id: "0",
        name: "RoboBrain",
        description: "Funny Robo lists and Face Detection from photo",
        year: "2018",
        photo: "./assets/img/RoboBrain.png",
        githubLink: "https://github.com/thquyen11/RoboBrain",
        liveDemo: "",
      },
      {
        id: "1",
        name: "Devspace",
        description: "My workspace with Pomodoro clock, music and popular quotes",
        year: "2019",
        photo: "./assets/img/DevSpace.jpg",
        githubLink: "https://github.com/thquyen11/thquyen11.github.io/tree/master/src/containers/DevSpace",
        liveDemo: "/quyenaholic.com/projects/devspace",
      },
      {
        id: "2",
        name: "FXculator",
        description: "Up-to-date money exchange rate and historical graph",
        year: "2019",
        photo: "",
        githubLink: "https://github.com/thquyen11/thquyen11.github.io/tree/master/src/containers/FXculator",
        liveDemo: "/quyenaholic.com/projects/fxculator",
      },
    ];

    const renderProjects = projects.map((project: any) => {
      return <ProjectCard project={project} />;
    });

    return (
      <div className="container" id="landing-page-wraper">
        <main className="container">
          <div className="background-color-layer"></div>
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
              <div className="card-body">
                <div className="row">
                  <div className="container col-md-3" id="profile-pic">
                    <img src={profilePic} alt="my awesome profile picture" />
                  </div>
                  <div className="container col-md-8 text-white bg-dark">
                    <p>Hi, I'm an experienced Murex consultant in Datamart Reporting, End-of-Day, etc...
                      who also loves software development and data science. I'd love to explore the
                      potential of machine learning in banking industry. Welcome to my blog where I share
                      my experiences and knowledge on my transition from Oil&Gas to Computer Science.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" id="projects-card">
              <div className="row justify-content-center">
                {renderProjects}
              </div>
            </div>

            <div className="card" id="works-card">
              <div className="container">
                <div className="card text-white bg-dark">
                  <h6 className="card-subtitle mb-2 text-muted">2018 - Present</h6>
                  <h5 className="card-title">Murex Technical Analyst - National Bank of Canada</h5>
                  <p className="card-text">
                    <ul>
                      <li>Support End of Day process</li>
                      <li>Technical support Murex user: Datamart Reporting, trades...</li>
                    </ul>
                  </p>
                </div>
              </div>
              <div className="container">
                <div className="card text-white bg-dark">
                  <h6 className="card-subtitle mb-2 text-muted">2016 - 2017</h6>
                  <h5 className="card-title">Murex Technical Consultant - Upskills</h5>
                  <p className="card-text">
                    <ul>
                      <li>Participate in Murex migration from 2.11 to 3.1 - TMB bank, Thailand</li>
                      <li>Murex integration stream including Reporting (Datamart), Market Data (RTBS, MDRS, MDIT), Confirmation</li>
                      <li>Involved in quality assessment for reporting before deliver to client</li>
                      <li>On-site support SIT, UAT, Go-Live: fix bugs on spot, communicate with User and developer team in order to clarify the business requirement, change request and enhanced the bug fixing progress</li>
                      <li>Participate in project management, support project manager to follow-up the schedule and man power</li>
                    </ul>
                  </p>
                </div>
              </div>
              <div className="container">
                <div className="card text-white bg-dark">
                  <h6 className="card-subtitle mb-2 text-muted">2013 - 2015</h6>
                  <h5 className="card-title">Field Engineer - Schlumberger</h5>
                  <p className="card-text">
                    <ul>
                      <li>Maximus ESP installation, commissioning, monitoring and troubleshooting for Vietsov Petro in White Tiger field, Vietnam</li>
                      <li>ESP surface equipment commissioning, startup and troubleshooting with new SLB generation VSD S7+ in Nongyao field, Thailand</li>
                      <li>Maximus ESP Installation with POD and sand screen in Bertam field, Malaysia</li>
                      <li>Maximus ESP Pull and Run with Trident Motor and Zenith downhole sensor in Su Tu Trang field, Vietnam</li>
                      <li>Gaslift Valves calibration and maintenance – SLB, WFT, Baker Hughes gaslift valves</li>
                      <li>Leading the field team and liaising with client and another department to provide the best Service Quality</li>
                    </ul>
                  </p>
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
                <input type="submit" className="btn btn-info" onClick={(event: any) => this.sendEmail(event)} value="Send message" />
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
