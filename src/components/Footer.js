export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} Abigail Morales * Events Listing Platform. All rights reserved.</p>
    </footer>
  )
}

const footerStyle = {
  padding: '1rem 2rem',
  textAlign: 'center',
  backgroundColor: '#222',
  color: 'white',
  marginTop: 'auto',
}