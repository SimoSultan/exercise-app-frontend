export default function ExternalLink({ children, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button>{children}</button>
    </a>
  );
}
