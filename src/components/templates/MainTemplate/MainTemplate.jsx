import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

function MainTemplate({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>

      <Footer />
    </>
  );
}

export default MainTemplate;
