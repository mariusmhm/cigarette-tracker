export default function Home() {
  const addLog = () => fetch("/api/addLog", {method: "POST"})
  return (
    <div className="flex justify-center m-auto h-[100vh] items-center">
      <button onClick={() => addLog()} className="p-10 bg-slate-900 text-white font-bold">ADD CIGARETTE</button> 
    </div>
  );
}
