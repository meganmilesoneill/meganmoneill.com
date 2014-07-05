/** @jsx React.DOM */
var data = {contact: {name: "Megan M. O'Neill",
                      image: "images/megan2.jpg",
                      text: "A seasoned professional with 15 years of experience in software development for financial services, health care, and non-profit industries. A demonstrated ability to master and excel in a wide range of technologies including web, mobile, and enterprise solutions. A strong track record as team lead and facilitating cross-team collaboration in developing high quality deliverables. Full knowledge of all aspects of the Software Development Life Cycle (SDLC) and fluent in Agile development methodologies." },
            experience: [
              {
                company: "AKQA",
                position: "Technical Manager",
                locations: ["New York, NY", "San Francisco, CA"],
                start_date: "November 2012",
                end_date: "July 2014",
                text: "Managed the effort to improve the market responsiveness of a suite of tablet applications used by field sales representatives. Identifying and executing strategies for improving client and vendor relations to facilitate the delivery of higher quality, sustainable retail environment products. Introducing industry best practices for managing the ongoing support and maintenance of the retail products in our portfolio. Architecting and managing the development effort on new and existing retail products. Working closely with Strategy to provide technical guidance on the viability of solutions pitched to the client. Developing strategies for building internal R&D practice geared to retaining top engineering talent while providing prototypes and technical guidance for use by the Creative and Strategy teams.",
                technologies: ["iOS", "Android", "MonoTouch", "C#", "jQuery", "Jenkins", "Jira", "Git", "SVN", "Windows Services", "Cinder", "Kinect", "NFC"]
              },
              {
                company: "International Rescue Committee",
                position: "Senior Developer",
                locations: ["New York, NY"],
                start_date: "January 2008",
                end_date: "October 2012",
                text: "Architected and built the organization's first enterprise-wide grants management system which is in use in nearly 40 countries with extremely challenging infrastructure and connectivity constraints. Worked with finance and refugee resettlement stakeholders to capture business processes. Helped define, implement, and tailor an agile development methodology appropriate to the organization's needs. Collaborated with the infrastructure team to create new development and testing environments based on best practices. Evaluated the merits of in-house, consultant built, and vendor solutions and presented the findings directly to the CTO. Involved in building engineering and product development teams via interviews and evaluations of resource requirements.",
                technologies: ["C#", "ASP.NET", "Python", "Django", "JavaScript", "jQuery", "Jira", "Jenkins", "Selenium", "Red Gate Tools"]
              },
              {
                company: "Avanade",
                position: "Senior Solution Developer",
                locations: ["New York, NY"],
                start_date: "April 2006",
                end_date: "December 2007",
                projects: [
                {
                  context: "Morgan Stanley",
                  text: "Architected a redesign of a retail banking product to bring the technology up to current best practices and standards. Managed a team of 12 developers including in-house, Avanade, Accenture, and contract resources, including an offshore team of 5 engineers. Worked with senior Accenture Managers to identify future business opportunities at Morgan Stanley."
                },
                { 
                  context: "a data forensics analysis company",
                  text: "Architected the redesign of a windows-based data forensics analysis application. Reduced execution time of data crunching of high risk transactions from the data warehouse by a factor of five by addressing bottlenecks in the data access layer. Identified solutions to support rapid development tailored to the company's future growth strategies and data privacy policies."
                },
                {
                  context: "the United States Census Bureau",
                  text: "Led the technical effort of the Mobile Applications team for the 2010 Decennial Census. Managed a team of 9 junior developers from Avanade, Accenture, and other contracting firms. Defined and tailored tasks to ensure the most effective team member contributions. Architected solutions to support iterative integration with other teams' deliverables under extremely tight deadlines, and provided weekly status reports to the client and internal management. Traveled to Canada to work directly with the Sybase iAnywhere to troubleshoot and resolve issues with their new mobile database product."
                }],
                technologies: ["C#", "Microsoft SQL Server 2005", "Windows Mobile", ".NET Compact Framework", "Sybase iAnywhere UltraLite", "ClearCase", "ClearQuest"]
              },
              {
                company: "Dell Professional Services",
                position: "Technical Senior Consultant",
                locations: ["New York, NY"],
                start_date: "April 2002",
                end_date: "April 2006",
                projects: [{ 
                  context: "a non-profit Lupus organization",
                  text: "Architected and led the development effort for a custom workflow-based CMS to support complex legal, medical, and copywriter review and compliance requirements for a a public facing Lupus website. Led, mentored, and provided career development opportunities for a team of up to 6 developers at a time. Led the transition effort of the project to Avanade."
                }],
                technologies: ["C#", "ASP.NET", "MSMQ", "Microsoft SQL Server 2000/2005", "Microsoft Team Foundation Server"]
              },
              {
                company: "Plural",
                position: "Software Architect",
                locations: ["New York, NY"],
                start_date: "June 2000",
                end_date: "April 2002",
                projects: [{
                  context: "a major investment bank",
                  text: "Architected and led the development effort on a custom workflow-based CMS for sharing market update content in video format. Created a first-to-market extranet portal to provide convertible bond financial data to the bank's clients. Collaborated with graphic and UX designers to create extranet brochure site for the TechBanking department."
                }],
                technologies: ["XML", "ASP", "MSMQ", "Visual Basic", "JavaScript", "Microsoft SQL Server 2000"]
              },
              {
                company: "Blackberry Technologies",
                position: "Senior Developer",
                locations: ["New York, NY"],
                start_date: "November 1999",
                end_date: "June 2000",
                text: "Led and mentored 2 to 3 developers on multiple projects. Dramatically streamlined an application designed to help bankers track deal activity and conduct performance reviews.",
                technologies: ["Visual Basic", "Microsoft SQL Server", "ASP"]
              },
              {
                company: "Schroders",
                position: "Senior Developer",
                locations: ["New York, NY"],
                start_date: "November 1997",
                end_date: "November 1999",
                text: "Gathered intranet content requirements from the Information Center, Fixed Income, and Corporate Finance departments to populate the first intranet site in the New York office. Led the development effort of the New York Intranet. Served as development liaison between the New York and London development groups in creating a global intranet site. Collaborated with the Networking group to administer and promote releases to the production intranet server environment. Established development standards for the intranet and mentored junior developers.",
                technologies: ["Visual Basic", "Microsoft SQL Server", "ASP", "Java", "Microsoft Site Server"]
              }
            ]
           };

var ContactSummary = React.createClass({
  render: function() {
    return (
      <div id="summary">
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
      <h1 id="name">
        {this.props.name}
      </h1>
    );
  }
});

var ContactImage = React.createClass({
  render: function() {
    return (
      <div id="image">
        <img alt={this.props.name} src={this.props.image} />
      </div>
    );
  }
});

var Contact = React.createClass({
  render: function() {
    return (
      <div id="contact">
        <ContactImage name={this.props.data.name} image={this.props.data.image} />
        <ContactName name={this.props.data.name} />
        <ContactSummary text={this.props.data.text} />
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
  render: function() {
    var jobNodes = this.props.data.map(function (job) {
      return (
        <Job data={job} />
      )
    });  
    return (
      <div id="experience">
        {jobNodes}
      </div>
    );
  }
});

React.renderComponent(
  <Contact data={data.contact} />,
  document.getElementById('sidebar')
);

React.renderComponent(
  <Experience data={data.experience} />,
  document.getElementById('main')
);
