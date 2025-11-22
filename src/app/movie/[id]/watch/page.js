export default function MovieWatch() {
  const fileId = "1d9o7qFaykwRqCk7MjXWedeuAV0tcVGV_";
  return (
    <div>
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        width="100%"
        height="1000"
        allow="autoplay"
        allowFullScreen
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
}
