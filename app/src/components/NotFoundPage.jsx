import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>This page does not exist</h1>
      <h3>You can go to the <Link to="/">main page</Link></h3>
    </div>
  )
}

export default NotFoundPage
