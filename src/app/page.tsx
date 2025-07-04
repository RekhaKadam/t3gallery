import Link from "next/link";


const mockUrls=[
  "https://p2h6kl34fe.ufs.sh/f/fS7jvLPqAanvl2Vpck7LxfP8DJeMRgKWmIGUzQE0Xpsnthkc",
 " https://p2h6kl34fe.ufs.sh/f/fS7jvLPqAanv7YMq2ZkkaHB8LJU1TzqMrICZlnGf3Y2dOQiV",
 "https://p2h6kl34fe.ufs.sh/f/fS7jvLPqAanvqoRuW40NwZJ7ImTAQSrWL5jU2syXcGHp3YPa"
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1, url,}));


export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4 ">{
       [...mockImages, ...mockImages, ...mockImages, ...mockImages].map((image)=>(
          <div key={image.id} className="w-48">
            
              <img src={image.url} alt="image" />
              </div>
          
        ))}
        
        </div>
    </main>
  );
}
