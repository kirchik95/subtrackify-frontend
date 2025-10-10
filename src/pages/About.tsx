function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold">About Subtrackify</h1>
      <p className="mt-4 text-gray-600">
        Subtrackify helps you keep track of all your recurring subscriptions
        and manage your monthly expenses effectively.
      </p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="mt-2 list-disc list-inside text-gray-600">
          <li>Track all your subscriptions in one place</li>
          <li>Get reminders before renewal dates</li>
          <li>Analyze your spending patterns</li>
          <li>Export your data anytime</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
