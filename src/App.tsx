import ChangeLogs from "./components/changelogs";
import Footer from "./components/footer";
import Header from "./components/header";
import OpSec from "./components/opsec";

export default function App() {

  const changelogs: [string, string[]][] = [
    [
      "1.0.0",
      [
        "Released in September 12, 2025.",
        "The very first version of this project.",
        "Can only process insertion and selection algorithm only."
      ]
    ],
    [
      "1.1.0",
      [
        "Released in September 14, 2025.",
        "Added bubble sorting algorithm."
      ]
    ]
  ]

  return (
    <>
      <Header/>
      <OpSec/>
      <ChangeLogs changelogs={changelogs}/>
      <Footer/>
    </>
  )
}