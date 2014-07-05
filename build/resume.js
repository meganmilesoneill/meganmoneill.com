/** @jsx React.DOM */
var ContactSummary = React.createClass({displayName: 'ContactSummary',
  render: function() {
    return (
      React.DOM.div( {className:"summary"}, 
        React.DOM.span( {className:"text"}, 
          this.props.text
        )
      )
    );
  }
});

var ContactName = React.createClass({displayName: 'ContactName',
  render: function() {
    return (
      React.DOM.h1( {className:"name"}, 
        this.props.name
      )
    );
  }
});

var ContactImage = React.createClass({displayName: 'ContactImage',
  render: function() {
    return (
      React.DOM.div( {className:"image"}, 
        React.DOM.img( {alt:this.props.name, src:this.props.image} )
      )
    );
  }
});

var Contact = React.createClass({displayName: 'Contact',
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
      React.DOM.div( {className:"contact"}, 
        ContactImage( {name:this.state.data.name, image:this.state.data.image} ),
        ContactName( {name:this.state.data.name} ),
        ContactSummary( {text:this.state.data.text} )
      )
    );
  }
});

var JobLocation = React.createClass({displayName: 'JobLocation',
  render: function() {
    return (
      React.DOM.span( {className:"location"}, this.props.data.join(" | "))    
    );
  }
});

var JobDuration = React.createClass({displayName: 'JobDuration',
  render: function() {
    return (
      React.DOM.div( {className:"time"}, 
        React.DOM.span( {className:"startdate"}, this.props.data.start_date)," \u2013 ",React.DOM.span( {className:"enddate"}, this.props.data.end_date)
      )
    );
  }
});  

var JobDimensions = React.createClass({displayName: 'JobDimensions',
  render: function() {
    return (
      React.DOM.div( {className:"timeandplace"}, 
        JobLocation( {data:this.props.data.locations} ),
        JobDuration( {data:this.props.data} )
      )
    );
  }
});

var JobPosition = React.createClass({displayName: 'JobPosition',
  render: function() {
    return (
      React.DOM.h2( {className:"position"}, this.props.text)
    );
  }  
});

var JobCompany = React.createClass({displayName: 'JobCompany',
  render: function() {
    return (
      React.DOM.span( {className:"company"}, this.props.text)
    );
  }
});

var JobTitles = React.createClass({displayName: 'JobTitles',
  render: function() {
    return (
      React.DOM.div( {className:"titles"}, 
        JobCompany( {text:this.props.data.company} ),
        JobPosition( {text:this.props.data.position} )
      )
    );
  }
});

var JobTechnologies = React.createClass({displayName: 'JobTechnologies',
  render: function() {
    var technologyNodes = this.props.data.map(function (technology) {
      return (
        React.DOM.li(null, technology)
      );
    });
    return (
      React.DOM.ul( {className:"technologies"}, 
        technologyNodes
      )
    );
  }
});

var JobProjects = React.createClass({displayName: 'JobProjects',
  render: function() {
    var projectNodes = this.props.data.map(function (job) {
      return (
        React.DOM.div( {className:"project"}, 
          React.DOM.p( {className:"context"}, "For ", job.context,":"),
          React.DOM.p( {className:"text"}, job.text)
        )
      );
    });
    return (
      React.DOM.div( {className:"projects"}, projectNodes)
    );
  }
});
      
var JobText = React.createClass({displayName: 'JobText',
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.p( {className:"text"}, this.props.data.text)
      )
    );
  }
});

var Job = React.createClass({displayName: 'Job',
  render: function() {
    return (
      React.DOM.div( {className:"job"}, 
        JobTitles( {data:this.props.data} ),
        JobDimensions( {data:this.props.data} ),
        this.props.data.projects ? JobProjects( {data:this.props.data.projects} ) : JobText( {data:this.props.data} ),
        JobTechnologies( {data:this.props.data.technologies} )
      )
    );
  }
});

var Experience = React.createClass({displayName: 'Experience',
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
        Job( {data:job} )
      )
    });  
    return (
      React.DOM.div( {className:"experience"}, 
        jobNodes
      )
    );
  }
});

React.renderComponent(
  Contact( {url:"/data/contact.json"} ),
  document.getElementById('sidebar')
);

React.renderComponent(
  Experience( {url:"/data/experience.json"} ),
  document.getElementById('main')
);
