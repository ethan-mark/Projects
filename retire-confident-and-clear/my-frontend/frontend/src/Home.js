import bookCover from './assets/images/book-cover.jpg'
import formPNG from './assets/images/form.png'
import authorPhoto from './assets/images/author-photo.jpg'
import greenButton from './assets/images/green-button.png'
import './assets/css/app.css'
export default function Home() {
  const openPopup = () => {
    document.getElementById('popupOverlay').classList.add('active');
    document.getElementById('popupForm').classList.add('active');
    document.getElementById('popupOverlay').style.display = 'block'
};

const closePopup = () => {
    document.getElementById('popupOverlay').classList.remove('active');
    document.getElementById('popupForm').classList.remove('active');
    document.getElementById('popupOverlay').style.display = 'none';
    
};
// function openPopup() {


    return (
      <div>
        <header style={{ backgroundColor: '#003366', color: 'white', padding: '20px', textAlign: 'center' }}>
          <h1>
            Free Book For Professional Women In Chicago Looking To Feel Confident, Comfortable And In Control Of Their
            Financial Future
          </h1>
          <p>
            Order your complimentary new book <strong>“Retire With Simplicity & Clarity”</strong> below and{' '}
            <strong>get a free Financial Retirement Consultation</strong> (value $595.00).
          </p>
        </header>
  
        <div className="main-content" style={{ padding: '20px' }}>
          <section className="book-section" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <img src={bookCover} alt="Retire With Simplicity & Clarity Book" style={{ maxWidth: '300px', height: 'auto' }} />
            <div className="details" style={{ maxWidth: '600px' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ color: 'green', fontWeight: 'bold', position: 'absolute', left: 0 }}>&#x2713;</span>
                  How to develop a comprehensive retirement plan that ensures financial stability and peace of mind
                  throughout your retirement years.
                </li>
                <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ color: 'green', fontWeight: 'bold', position: 'absolute', left: 0 }}>&#x2713;</span>
                  Methods to prepare for and manage the financial burden of long-term medical care, so you can protect your
                  savings and maintain your quality of life.
                </li>
                <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ color: 'green', fontWeight: 'bold', position: 'absolute', left: 0 }}>&#x2713;</span>
                  How potential increases in tax rates could impact your retirement savings and discover strategies to
                  mitigate these effects.
                </li>
                <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ color: 'green', fontWeight: 'bold', position: 'absolute', left: 0 }}>&#x2713;</span>
                  Insights into how to adjust your financial plan in response to life changes and economic shifts, ensuring
                  your retirement plan remains effective and relevant.
                </li>
              </ul>
              <a href="#" onClick={() => openPopup()} style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>
                <img src={greenButton} alt="Yes! Mail Me The Free Book!" />
              </a>
            </div>
          </section>
  
          <section
            className="author-section"
            style={{ backgroundColor: '#f9f9f9', padding: '20px', textAlign: 'center' }}
          >
            <h2>Meet The Author</h2>
            <img
              src={authorPhoto}
              alt="Ron Mark"
              style={{ maxWidth: '150px', height: 'auto', borderRadius: '50%', marginBottom: '20px' }}
            />
            <p>
              Ron Mark is a best-selling author and an experienced financial advisor with over three decades in the finance
              industry. He has developed a profound understanding of the financial challenges and opportunities that
              individuals face, particularly professional women as they work to secure the retirement they've always
              envisioned.
            </p>
          </section>
        </div>
  
        <footer style={{ backgroundColor: '#003366', color: 'white', textAlign: 'center', padding: '20px' }}>
          <a href="#" onClick={() => openPopup()} style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>
            <img src={greenButton} alt="Yes! Mail Me The Free Book!" />
          </a>
        </footer>
  
        <div
          className="popup-overlay"
          id="popupOverlay"
          style={{
            display: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        ></div>
      </div>
    );
  }
  
  