import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TopNav({ setPage }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-[24px] bg-white px-6 py-4 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-slate-900">LifeMind</h2>
        <p className="text-sm text-slate-500">Microlearning Prototype</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => setPage("dashboard")} className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
          Dashboard
        </button>
        <button onClick={() => setPage("catalog")} className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
          Catalog
        </button>
        <button onClick={() => setPage("plan")} className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
          AI Plan
        </button>
        <button onClick={() => setPage("lesson")} className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
          Lesson
        </button>
        <button onClick={() => setPage("tutor")} className="rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white">
          Tutors
        </button>
        <button onClick={() => setPage("notifications")} className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
          Notifications 
        </button>

      </div>
    </div>
  );
}

function Back({ setPage }) {
  return (
    <div className="mt-8">
      <button
        onClick={() => setPage("dashboard")}
        className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

function TutorRequestModal({
  selectedTutor,
  setSelectedTutor,
  requestSent,
  setRequestSent,
}) {
  return (
    <AnimatePresence>
      {selectedTutor && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTutor(null)}
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-white p-8 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">Request a Session</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Prototype tutor request flow
                </p>
              </div>
              <button
                onClick={() => setSelectedTutor(null)}
                className="rounded-xl px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold">{selectedTutor.name}</p>
              <p className="text-sm text-slate-500">{selectedTutor.specialty}</p>
            </div>

            {requestSent ? (
              <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">
                Session request sent successfully. In the full system, this
                would connect to notifications and tutor availability.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    What do you need help with?
                  </label>
                  <textarea
                    className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
                    defaultValue="I want help with beginner Excel skills and how they apply to analyst roles."
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Preferred Day
                    </label>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
                      defaultValue="Saturday"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Preferred Time
                    </label>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
                      defaultValue="2:00 PM"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setRequestSent(true)}
                className="rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-500 px-5 py-3 font-semibold text-white"
              >
                Send Request
              </button>
              <button
                onClick={() => setSelectedTutor(null)}
                className="rounded-2xl border border-slate-200 px-5 py-3"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [page, setPage] = useState("login");
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [progress, setProgress] = useState(68);
  const [lessonsCompleted, setLessonsCompleted] = useState(6);
  const [lessonDone, setLessonDone] = useState(false);
  const [planIndex, setPlanIndex] = useState(0);
  const [planLoading, setPlanLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const plans = [
    [
      ["Monday", "Excel formulas and spreadsheet basics", "Career"],
      ["Tuesday", "Budget categories and fixed expenses", "Finance"],
      ["Wednesday", "French greetings and introductions", "Language"],
      ["Thursday", "Weekly review and tutor support check-in", "Support"],
    ],
    [
      ["Monday", "Time blocking and study planning", "Productivity"],
      ["Tuesday", "Excel shortcuts and formatting", "Career"],
      ["Wednesday", "Budget reflection and monthly habits", "Finance"],
      ["Thursday", "Tutor follow-up and review session", "Support"],
    ],
  ];

  const regeneratePlan = () => {
    setPlanLoading(true);
    setTimeout(() => {
      setPlanIndex((prev) => (prev + 1) % plans.length);
      setPlanLoading(false);
    }, 1200);
  };

  if (page === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-600 via-cyan-500 to-emerald-500 px-4 text-white">
        <motion.div
          className="grid w-[950px] overflow-hidden rounded-[32px] bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col justify-center p-10 text-left">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/70">
              AI-Powered Microlearning
            </p>
            <h1 className="mb-4 text-5xl font-bold leading-tight">
              Learn faster with a plan built for real life.
            </h1>
            <p className="mb-6 text-white/80">
              LifeMind combines short lessons, weekly AI planning, progress
              tracking, and tutor support in one modern learning experience.
            </p>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold">Smart weekly planning</p>
                <p className="text-sm text-white/75">
                  Personalized study paths built around your goals.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold">Micro lessons</p>
                <p className="text-sm text-white/75">
                  Quick, focused learning sessions you can actually finish.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold">Tutor support</p>
                <p className="text-sm text-white/75">
                  Request help when you need extra guidance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white p-10 text-slate-900">
            <div className="w-full max-w-sm">
              <h2 className="mb-2 text-3xl font-bold">Sign in</h2>
              <p className="mb-6 text-slate-500">
                Enter the LifeMind prototype experience
              </p>

              <div className="space-y-4">
                <input
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
                />

                <button
                  onClick={() => setPage("dashboard")}
                  className="w-full rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
                >
                  Enter Prototype
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium">
                    Create Account
                  </button>
                  <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium">
                    Tutor Login
                  </button>
                </div>

                <p className="text-xs text-slate-400">
                  Mocked login for prototype demonstration only.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (page === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <TopNav setPage={setPage} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-8 rounded-[32px] bg-gradient-to-r from-sky-600 to-emerald-500 p-8 text-white shadow-xl">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/75">
              Weekly Snapshot
            </p>
            <h1 className="mb-2 text-4xl font-bold">Welcome back</h1>
            <p className="mb-6 text-white/85">
              Your weekly progress is <span className="font-semibold">{progress}%</span>.
              You’re on track with your personalized study plan.
            </p>

            <div className="h-3 w-full rounded-full bg-white/20">
              <div
                className="h-3 rounded-full bg-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Lessons Completed</p>
              <h3 className="mt-2 text-3xl font-bold">{lessonsCompleted}</h3>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Assessment Score</p>
              <h3 className="mt-2 text-3xl font-bold">84%</h3>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Top Category</p>
              <h3 className="mt-2 text-3xl font-bold">Career</h3>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <button onClick={() => setPage("catalog")} className="rounded-3xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1">
              <h3 className="text-xl font-semibold">Browse Courses</h3>
              <p className="mt-2 text-sm text-slate-500">
                Explore new modules by topic and category.
              </p>
            </button>

            <button onClick={() => setPage("plan")} className="rounded-3xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1">
              <h3 className="text-xl font-semibold">AI Learning Plan</h3>
              <p className="mt-2 text-sm text-slate-500">
                View your personalized weekly study roadmap.
              </p>
            </button>

            <button onClick={() => setPage("lesson")} className="rounded-3xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1">
              <h3 className="text-xl font-semibold">Continue Lesson</h3>
              <p className="mt-2 text-sm text-slate-500">
                Jump back into your current microlearning session.
              </p>
            </button>

            <button onClick={() => setPage("tutor")} className="rounded-3xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1">
              <h3 className="text-xl font-semibold">Find a Tutor</h3>
              <p className="mt-2 text-sm text-slate-500">
                Browse tutor profiles and request a support session.
              </p>
            </button>

            <button
              onClick={() => setPage("recap")}
              className="rounded-3xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold">Weekly Recap</h3>
              <p className="mt-2 text-sm text-slate-500">
                Review completed work, remaining tasks, and next-week focus.
              </p>
            </button>

            <button
              onClick={() => setPage("notifications")}
              className="rounded-3xl bg-white p-6 text-left shadow-sm transition hovwe:-translate-y-1"
            >
              <h3 className="text-xl font-semibold">Notifications</h3>
              <p className="mt-2 text-sm text-slate-500">
                Manage reminders for lessons, tutor sessions, and weekly recap updates.
              </p>
            </button>

            <div className="rounded-3xl bg-white p-6 text-left shadow-sm">
              <h3 className="text-xl font-semibold">Next Milestone</h3>
              <p className="mt-2 text-sm text-slate-500">
                Complete one more lesson to unlock your weekly recap and assessment insights.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (page === "catalog") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <TopNav setPage={setPage} />

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Course Catalog</h1>
            <p className="mt-2 text-slate-500">
              Explore personalized learning tracks by topic and goal.
            </p>
          </div>
          <input
            placeholder="Search modules..."
            className="w-72 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {["Career", "Finance", "Language", "Productivity"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Career", "Excel for Career Switchers", "Build foundational spreadsheet skills for office and analyst roles."],
            ["Finance", "Budgeting Basics for Real Life", "Learn how to build a realistic monthly budget and track spending habits."],
            ["Language", "French for Daily Life", "Practice practical phrases for everyday conversations and travel."],
          ].map(([tag, title, desc]) => (
            <div key={title} className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1">
              <div className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                {tag}
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{desc}</p>
              <div className="mt-5 flex gap-3">
                <button onClick={() => setPage("lesson")} className="rounded-2xl bg-slate-900 px-4 py-2 text-white">
                  View Module
                </button>
                <button className="rounded-2xl border border-slate-200 px-4 py-2">
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>

        <Back setPage={setPage} />
      </div>
    );
  }

  if (page === "plan") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <TopNav setPage={setPage} />

        <div className="mb-8 rounded-[32px] bg-gradient-to-r from-sky-600 to-emerald-500 p-8 text-white shadow-xl">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/70">
            AI-generated roadmap
          </p>
          <h1 className="text-4xl font-bold">Your Weekly Learning Plan</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Built around your goals in career growth, financial literacy, and practical life skills.
          </p>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
               Why this plan?
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              AI selected this schedule based on your goals and progress
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              This week emphasizes career and finance skills because your recent progress
              and assessment trends show strong performance in those areas. The plan also
              includes a language session and a tutor check-in to maintain balance and 
              reinforce weaker areas.
            </p>
          </div>

          <div className="flex items-start justify-end">
            <button
              onClick={regeneratePlan}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-white transition hover:scale-[1.02]"
            >
               Regenerate Plan
             </button>
            </div>
          </div>

        {planLoading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mb-3 text-2xl font-bold text-slate-900">Generating your updated plan…</div>
            <p className="text-slate-500">
              LifeMind is adjusting your roadmap based on your goals and progress.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {plans[planIndex].map(([day, task, tag]) => (
              <div key={day} className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">{day}</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    {tag}
                  </span>
                </div>
                <h3 className="font-semibold">{task}</h3>
                <button className="mt-4 text-sm font-medium text-sky-600">
                  Open Task →
                </button>
              </div>
            ))}
          </div>
        )}

        <Back setPage={setPage} />
      </div>
    );
  }

  if (page === "recap") {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <TopNav setPage={setPage} />

      <div className="mb-8 rounded-[32px] bg-gradient-to-r from-sky-600 to-emerald-500 p-8 text-white shadow-xl">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/70">
          Weekly Summary
        </p>
        <h1 className="text-4xl font-bold">Your Weekly Progress Recap</h1>
        <p className="mt-3 max-w-2xl text-white/85">
          Review what you completed this week, identify remaining gaps, and prepare for next week.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Completed This Week</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>• Excel for Career Switchers lesson completed</li>
            <li>• Budgeting Basics module reviewed</li>
            <li>• Tutor profiles explored</li>
          </ul>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Remaining Gaps</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>• Formula confidence needs improvement</li>
            <li>• More practice needed on budgeting categories</li>
            <li>• French speaking review still pending</li>
          </ul>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Next Week Focus</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>• Continue Excel practice</li>
            <li>• Complete one finance exercise</li>
            <li>• Schedule one tutor support session</li>
          </ul>
        </div>
      </div>

      <Back setPage={setPage} />
    </div>
  );
}

if (page === "notifications") {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <TopNav setPage={setPage} />

      <div className="mb-8 rounded-[32px] bg-gradient-to-r from-sky-600 to-emerald-500 p-8 text-white shadow-xl">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/70">
          Reminder Center
        </p>
        <h1 className="text-4xl font-bold">Notifications & Reminders</h1>
        <p className="mt-3 max-w-2xl text-white/85">
          Manage how LifeMind reminds you about lessons, tutor sessions, and weekly progress.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Notification Preferences</h3>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div>
              <p className="font-medium text-slate-900">Enable reminders</p>
              <p className="text-sm text-slate-500">
                Receive alerts for lessons, tutor sessions, and recaps
              </p>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold text-white ${
                notificationsEnabled ? "bg-emerald-500" : "bg-slate-400"
              }`}
            >
              {notificationsEnabled ? "On" : "Off"}
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Lesson reminder: 1 day before scheduled task
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Tutor reminder: 30 minutes before session
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Weekly recap: Every Sunday evening
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Upcoming Alerts</h3>
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-medium">Excel lesson reminder</p>
              <p className="text-sm text-slate-500">Tomorrow at 6:00 PM</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-medium">Tutor check-in reminder</p>
              <p className="text-sm text-slate-500">Saturday at 2:00 PM</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-medium">Weekly recap available</p>
              <p className="text-sm text-slate-500">Sunday at 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <Back setPage={setPage} />
    </div>
  );
}

  if (page === "lesson") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <TopNav setPage={setPage} />

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-3 flex gap-2">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                Career
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                8 min
              </span>
            </div>

            <h1 className="text-3xl font-bold">Excel for Career Switchers</h1>
            <p className="mt-2 text-slate-500">
              Short step-by-step lesson with visuals and completion tracking.
            </p>

            <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-400">
              Lesson visual placeholder
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Open the spreadsheet and identify the income and expense sections.",
                "Enter fixed monthly expenses first.",
                "Add variable expenses like groceries and gas.",
                "Compare total expenses against income and adjust one category.",
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                    {idx + 1}
                  </div>
                  <div className="text-sm text-slate-700">{step}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  if (!lessonDone) {
                    setLessonDone(true);
                    setProgress(75);
                    setLessonsCompleted(7);
                  }
                }}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-white"
              >
                Mark Complete
              </button>
              <button className="rounded-2xl border border-slate-200 px-5 py-3">
                Save for Later
              </button>
            </div>

            {lessonDone && (
              <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                Nice work — this lesson has been completed, and your dashboard progress has been updated.
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Lesson Status</h3>
              <p className="mb-2 text-sm text-slate-500">Module completion</p>
              <div className="h-3 w-full rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-sky-600 to-emerald-500 transition-all duration-500"
                  style={{ width: lessonDone ? "100%" : "40%" }}
                ></div>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-700">
                {lessonDone ? "100% complete" : "40% complete"}
              </p>
            </div>

            <div className="rounded-[32px] bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Recommended Next</h3>
              <div className="space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  Assessment review: formulas and chart basics
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  AI weekly plan refresh on Friday
                </div>
              </div>
            </div>
          </div>
        </div>

        <Back setPage={setPage} />
      </div>
    );
  }

  if (page === "tutor") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <TopNav setPage={setPage} />

        <div className="mb-8 rounded-[32px] bg-gradient-to-r from-sky-600 to-emerald-500 p-8 text-white shadow-xl">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/70">
            Tutor Support
          </p>
          <h1 className="text-4xl font-bold">Find a Tutor or Coach</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Browse tutor profiles and request support for your learning goals.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              name: "Maya Chen",
              specialty: "Career & Excel",
              bio: "Helps learners transition into entry-level business and analyst roles.",
              rating: "4.9",
            },
            {
              name: "Sofia Laurent",
              specialty: "French Conversation",
              bio: "Focuses on beginner-friendly speaking practice and real-life confidence.",
              rating: "4.8",
            },
            {
              name: "Jordan Ellis",
              specialty: "Study Skills & Productivity",
              bio: "Works with busy learners to build habits and stay accountable.",
              rating: "4.9",
            },
          ].map((tutor) => (
            <motion.div
              key={tutor.name}
              whileHover={{ y: -6 }}
              className="rounded-[32px] bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-lg font-bold text-slate-700">
                  {tutor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{tutor.name}</h3>
                  <p className="text-sm text-slate-500">{tutor.specialty}</p>
                </div>
              </div>

              <p className="mb-4 text-sm text-slate-600">{tutor.bio}</p>

              <div className="mb-5 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {tutor.rating} Rating
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedTutor(tutor);
                    setRequestSent(false);
                  }}
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-white"
                >
                  Request Session
                </button>
                <button className="rounded-2xl border border-slate-200 px-4 py-2">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <Back setPage={setPage} />

        <TutorRequestModal
          selectedTutor={selectedTutor}
          setSelectedTutor={setSelectedTutor}
          requestSent={requestSent}
          setRequestSent={setRequestSent}
        />
      </div>
    );
  }

  return null;
}