export default function Footer() {
  return (
    <footer style={footerStyle} className="flex-col items-center justify-center md:h-100% hidden lg:nope">
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