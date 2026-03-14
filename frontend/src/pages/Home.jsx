import { Link } from "react-router-dom";
import { Check, Sparkles,ArrowRight,Zap,Video,CodeXml,Users } from 'lucide-react';
import { SignIn, SignInButton } from "@clerk/clerk-react";

function Home() {
  return (
    <div className="bg-linear-to-br from-base-100 via-base-200 to-base-300"> 
      {/* Navbar */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* LOGO */}
          <Link to={"/"} className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="size-10 rounded-xl bg-linear-to-br from-orange-500 to-yellow-400 flex items-center justify-center shadow-lg">
              <Sparkles className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent font-mono tracking-wider">
                Sharanga IQ
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">Practice Together</span>
            </div>

          </Link>

          {/* GET started button */}
          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-linear-to-r from-orange-500 to-yellow-400 rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LeftContent */}
          <div className="space-y-8">
            <div className="badge  badge-lg bg-[#FF8C00] text-black font-semibold">
              <Zap className="size-4"></Zap>
              Real Time Collaboration
            </div>

            <h1 className="text-5xl lg-text-7xl font-black leading-tight">
              <span className="bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent ">Practice Together</span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>

            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              The ultimate platform for collaborative coding interviews and pair programming by <span className="text-bold text-orange-500 ">Sumit Raghav</span>.
              Connect face-to-face, code in real-time, and ace your technical interviews.
            </p>

            {/* feature section */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <Check className="size-4 text-orange-400"/>
                Live Video Chat
              </div>
              <div className="badge badge-lg badge-outline">
                <Check className="size-4 text-orange-400"/>
                Code Editor
              </div><div className="badge badge-lg badge-outline">
                <Check className="size-4 text-orange-400"/>
                Multi-Language
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary bg-linear-to-r from-[#FF8C00] to-yellow-400 border-none btn-lg">
                  Start Coding Now
                  <ArrowRight className="size-5"/>
                </button>
              </SignInButton>

              <button className="btn btn-outline btn-lg">
                <Video className="size-5" />
                Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
              <div className="stat">
                <div className="stat-value text-orange-400">100+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-yellow-400">500+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-yellow-300">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>

          </div>

          {/* Right Image */}
          <img src="/coder.png" 
            alt="Code Collaborative Platform" 
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
            />
        </div>

      </div>  

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-orange-400 font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>
      {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center mb-4">
                <Video className="size-8 text-orange-500" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during interviews
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center mb-4">
                <CodeXml className="size-8 text-orange-500" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multiple language support
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center mb-4">
                <Users className="size-8 text-orange-500" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions, and learn from each other in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
