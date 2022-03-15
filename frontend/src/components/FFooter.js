import {Component} from 'react';

class FFooter extends Component 
{
  render () 
  {
    return (
    <div className="FFooter text-center mt-auto ffooter" >
        <p className="mb-1"><a href="">Terms of Service</a> - <a href="">Privacy Policy</a> - <a href="">Cookie Policy</a> - <a href="">About</a> - <a href="">Developers</a></p>
        <p>(c) 2022 filmer inc.</p>
    </div>
    );
  }
}

export default FFooter;
