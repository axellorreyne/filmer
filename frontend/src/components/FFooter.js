import {Component} from 'react';

class FFooter extends Component 
{
  render () 
  {
    return (
    <div className="ffs-4 rgb-2 text-center mt-auto ffooter mb-2">
        <p className="mb-2">All movie information is provided by <a href="https://www.themoviedb.org/">TMDB</a></p>
        <p className="mb-1">
            <a href="/notimplemented">Terms of Service</a> - <a href="/notimplemented">Privacy Policy</a> - <a href="/notimplemented">Cookie Policy</a> - <a href="/notimplemented">About</a> - <a href="/notimplemented">Developers</a>
        </p>
        <p>(c) 2022 filmer inc.</p>
    </div>
    );
  }
}

export default FFooter;
