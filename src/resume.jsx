/** @jsx React.DOM */
var ContactSummary = React.createClass({
  render: function() {
    return (
      <div className="summary">
        <span className="text">
          {this.props.text}
        </span>
      </div>
    );
  }
});

var ContactName = React.createClass({
  render: function() {
    return (
      <h1 className="name">
        {this.props.name}
      </h1>
    );
  }
});

var ContactImage = React.createClass({
  render: function() {
    return (
      <div className="image">
        <img alt={this.props.name} src={this.props.image} />
      </div>
    );
  }
});

var Contact = React.createClass({
  getInitialState: function() {
    return {data: {name: '', image: '', text: ''}};
  },    
  componentWillMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  render: function() {
    return (
      <div className="contact">
        <ContactImage name={this.state.data.name} image={this.state.data.image} />
        <ContactName name={this.state.data.name} />
        <ContactSummary text={this.state.data.text} />
      </div>
    );
  }
});

var JobLocation = React.createClass({
  render: function() {
    return (
      <span className="location">{this.props.data.join(" | ")}</span>    
    );
  }
});

var JobDuration = React.createClass({
  render: function() {
    return (
      <div className="time">
        <span className="startdate">{this.props.data.start_date}</span>{" \u2013 "}<span className="enddate">{this.props.data.end_date}</span>
      </div>
    );
  }
});  

var JobDimensions = React.createClass({
  render: function() {
    return (
      <div className="timeandplace">
        <JobLocation data={this.props.data.locations} />
        <JobDuration data={this.props.data} />
      </div>
    );
  }
});

var JobPosition = React.createClass({
  render: function() {
    return (
      <h2 className="position">{this.props.text}</h2>
    );
  }  
});

var JobCompany = React.createClass({
  render: function() {
    return (
      <span className="company">{this.props.text}</span>
    );
  }
});

var JobTitles = React.createClass({
  render: function() {
    return (
      <div className="titles">
        <JobCompany text={this.props.data.company} />
        <JobPosition text={this.props.data.position} />
      </div>
    );
  }
});

var JobTechnologies = React.createClass({
  render: function() {
    var technologyNodes = this.props.data.map(function (technology) {
      return (
        <li>{technology}</li>
      );
    });
    return (
      <ul className="technologies">
        {technologyNodes}
      </ul>
    );
  }
});

var JobProjects = React.createClass({
  render: function() {
    var projectNodes = this.props.data.map(function (job) {
      return (
        <div className="project">
          <p className="context">For {job.context}:</p>
          <p className="text">{job.text}</p>
        </div>
      );
    });
    return (
      <div className="projects">{projectNodes}</div>
    );
  }
});
      
var JobText = React.createClass({
  render: function() {
    return (
      <div>
        <p className="text">{this.props.data.text}</p>
      </div>
    );
  }
});

var Job = React.createClass({
  render: function() {
    return (
      <div className="job">
        <JobTitles data={this.props.data} />
        <JobDimensions data={this.props.data} />
        {this.props.data.projects ? <JobProjects data={this.props.data.projects} /> : <JobText data={this.props.data} />}
        <JobTechnologies data={this.props.data.technologies} />
      </div>
    );
  }
});

var Experience = React.createClass({
  getInitialState: function() {
    return {data: []};
  },    
  componentWillMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  render: function() {
    var jobNodes = this.state.data.map(function (job) {
      return (
        <Job data={job} />
      )
    });  
    return (
      <div className="experience">
        {jobNodes}
      </div>
    );
  }
});

React.renderComponent(
  <Contact url="/data/contact.json" />,
  document.getElementById('sidebar')
);

React.renderComponent(
  <Experience url="/data/experience.json" />,
  document.getElementById('main')
);
