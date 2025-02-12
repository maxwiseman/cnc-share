export default function Page() {
  return (
    <div className="flex w-full justify-center">
      <div className="typography w-full max-w-prose">
        <h1>About</h1>
        <p>
          My name is William, and I am the founder of CNC File Share. This
          website was created with the goal of providing a space where creators
          can share their ideas and inspire others within the CNC machining
          community.
        </p>
        <p>
          We understand that many individuals use CNC machines as a source of
          income and may be hesitant to share their files. While we respect the
          need to protect proprietary work, our mission is not to request trade
          secrets but to foster an environment where knowledge and creativity
          can thrive. By contributing designs that you no longer use or created
          for fun, you can help build a resource that benefits the entire CNC
          community.
        </p>
        <p>
          If you have any old files that could inspire or assist others, we
          encourage you to share them. After all, a file-sharing community
          thrives on shared contributions. Thank you for being a part of CNC
          File Share!
        </p>
        <p>
          You can contact me at{" "}
          <a href="mailto:contact@cnc-share.com">contact@cnc-share.com</a>.
        </p>
      </div>
    </div>
  );
}
