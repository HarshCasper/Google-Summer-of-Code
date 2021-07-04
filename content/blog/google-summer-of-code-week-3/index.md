---
title: GSoC '21 Week 3 - It's all coming together!
date: "2021-07-04"
description: "Documenting the progress of the third week of Google Summer of Code"
tags: ["gsoc","open-source","metacall","week-3"]
disqus: true
---

Google Summer of Code 2021 Coding Period started with a bang on June 7. After weeks of pre-planning and preparation, I was finally able to set things in motion with my project. The third week of the Coding Period required me to integrate the MetaCall executable with the Jupyter Notebook and develop a language inference model to automatically predict the language to be executed in the cell.

The end product of the Google Summer of Code coding period is to develop a Jupyter Notebook interface that supports various runtimes and can enable developers to inter-mix languages amongst each other.

![image](its-all-coming-together.gif)

> Oh Yeah, It's all coming together! ~ Kronk, The Emperor's New Groove

### Progress

The third week of the Coding Period started with me and [Vicente](https://github.com/viferga), realizing the futility of following the approach where we launch the Notebook through MetaCall. As I discussed in my earlier blog-post, MetaCall’s Python imports don't behave in a way that the standard Python imports behave. Thus the earlier idea to embed the `metacall_load_from_memory` API won’t work and we would have to rely on a subprocess to execute a child program in a new process.

[PR #12](https://github.com/metacall/jupyter-kernel/pull/12) added a fix for the [8f699b9](https://github.com/metacall/jupyter-kernel/commit/8f699b9c24021d0615c3f769625dedc28930a6df) commit, made by [Vicente](https://github.com/viferga) which allows for the execution of Node Scripts by MetaCall. This is made possible by grabbing the code, pushing it in a temporary file, running a subprocess with MetaCall, logging the output and flushing all the temporary files.

Apart from this, a [sample Notebook](https://github.com/metacall/jupyter-kernel/blob/4091b04de13d3c36c9c7813715504a1544b3b58f/examples/JavaScript_Example_Notebook.ipynb) has also been added, which displays how the Node Scripts are being executed. As a User, you can now write JavaScript code which would be then executed by the MetaCall executable and logged as an output.

[PR #14](https://github.com/metacall/jupyter-kernel/pull/14) added an automated language detection feature to the Jupyter Notebook. This allows the user to execute both JavaScript and Python (the only supported languages for now) singularly onto the Kernel without specifying the language using any input or magics. It has been made possible by [guesslang](https://guesslang.readthedocs.io/en/latest/), an Open-Source Deep Learning Library that allows us to detect the correct programming language.

Apart from this, we moved a step in CI/CD by adding a [Dockerfile](https://github.com/metacall/jupyter-kernel/blob/master/Dockerfile) to the project and created an integration with Binder. You can now launch the Jupyter Notebooks from [Binder](https://mybinder.org/) and run them directly from your [browser](https://mybinder.org/v2/gh/metacall/jupyter-kernel/master).

![image](engage.gif)

### Blockers

The usage of Guesslang has been through a library and this approach has exposed some pitfalls:

-   Guesslang depends on Tensorflow as its primary dependency. Hence the Kernel with the automated language checks would be possible only on high-end devices with GPU availability.
-   The inference speed has been affected due to this new dependency and requirement. Hence some users will experience slower execution speed.
-   Guesslang is not able to detect short snippets of the code. Statements like `print(“Hello World!’)` is common in a variety of programming languages like Python, Scala, Ruby to name a few.
-   `Guesslang` misclassifies C/C++ and JavaScript/TypeScript. This is because a valid JavaScript source code is always a valid TypeScript code. Due to this, every code detected as JavaScript/TypeScript is to be executed using the JavaScript loader.

While most of these issues are present in the upstream projects, making changes to them would go beyond the scope of this project. These issues would be mitigated by the usage of magics so that users can specify the language themselves while executing.

![image](open-source.gif)

### Learnings

Some of the learnings this week were associated with creating child processes and delving deep into automated language checks. It also helped me become a better documentation reader as it is always preferred to study more documentation than delve into code directly.

Though this week was free from pesky bugs and I was not blocked on anything for long (thanks to my mentor), I carried out a lot of experiments to find the viable approach to the problems we had at hand. This overall gave me greater confidence to approach the problem and build features on top of the same.

### Plans for next week

While I’m writing this blog, the fourth week of the Coding period is already in progress. During this week, I would like to work on making the execution part more robust, find and fix any bugs that I find and add support for magics. I would also be working on adding more CI toolings, especially to check and validate the code quality and dependency management, and finally, support shell commands.

The third-week progress has been received positively by my mentor and the community. It has been a great experience working so far and I hope I can work even more in the coming weeks and successfully execute the project.

Signing off the third-week log about my Google Summer of Code experience!

![image](good-bye.gif)
