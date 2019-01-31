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
    return (
      <div className="card col-lg-3 col-md-5" id="project-card">
        <img src={project.photo} alt="project photo" />
        <h5>{project.name}</h5>
        <p>{project.description}</p>
        <h6>{project.year}</h6>
        <p>
          <a href={project.githubLink} target="blank">
            <button type="button" className="btn btn-dark"><p>GitHub</p></button>
          </a>
          {project.Link !== "" ?
            <Link to={project.Link}>
              <button type="button" className="btn btn-dark"><p>LiveDemo</p></button>
            </Link>
            : <button type="button" className="btn btn-secondary"><p>LiveDemo</p></button>
          }
          </p>
      </div>
        )
      }
    }
export default ProjectCard;