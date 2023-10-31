import './styles.scss';

const PageNotFound = () => {
  return (
    <div className="not_found_container">
      <div className="not_found_content">
        <h1 className="not_found_title">404</h1>
        <p className="not_found_text">Page Not Found</p>
        <p className="not_found_description">
          Sorry, the page you are looking for does not exist. Please refresh the
          page
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
