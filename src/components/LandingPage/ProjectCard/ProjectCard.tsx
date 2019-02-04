import * as React from 'react';
import { Link } from 'react-router-dom'
import "./ProjectCard.scss";

interface IProjectCard {
  project: any
}

class ProjectCard extends React.Component<IProjectCard> {
  constructor(props: IProjectCard) {
    super(props);
  }

  render() {
    const { project } = this.props;
    console.log(project.name);

    // RoboBrain: open new window with href
    // Not RoboBrain: route to other view using react-router
    return project.name === "RoboBrain" ?
      (
        <div className="card col-lg-3 col-md-5" id="project-card">
          <img src={project.photo} alt="project photo" />
          <h5>{project.name}</h5>
          <p>{project.description}</p>
          <h6>{project.year}</h6>
          <p>
            <a href={project.githubLink} target="blank">
              <button type="button" className="btn btn-dark"><p>GitHub</p></button>
            </a>
            <a href={project.liveDemo} target="blank">
              <button type="button" className="btn btn-dark"><p>Live Demo</p></button>
            </a>
          </p>
        </div>
      )
      : (
        <div className="card col-lg-3 col-md-5" id="project-card">
          <img src={project.photo} alt="project photo" />
          <h5>{project.name}</h5>
          <p>{project.description}</p>
          <h6>{project.year}</h6>
          <p>
            <a href={project.githubLink} target="blank">
              <button type="button" className="btn btn-dark"><p>GitHub</p></button>
            </a>
            <Link to={project.liveDemo}>
              <button type="button" className="btn btn-dark"><p>Live Demo</p></button>
            </Link>
          </p>
        </div >
      )
  }
}

export default ProjectCard;