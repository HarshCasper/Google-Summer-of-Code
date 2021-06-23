---
title: GSoC '21 Week 2 - So it begins!
date: "2021-06-23"
description: "Documenting the progress of the second week of Google Summer of Code"
tags: ["gsoc","open-source","metacall","week-2"]
disqus: true
---

[Google Summer of Code 2021](https://summerofcode.withgoogle.com/) Coding Period started with a bang on June 7. After weeks of pre-planning and preparation, I was finally able to set things in motion with my project. The second week of the Coding Period required me to research on the possible ways of integrating the MetaCall APIs with the Jupyter Kernel after the skeleton kernel was initialized and set up.

The end product of the Google Summer of Code coding period is to develop a [Jupyter Notebook interface](https://github.com/metacall/jupyter-kernel) that supports various runtimes and can enable developers to inter-mix languages amongst each other.

![image](so-it-begins.gif)

> "So it begins!" ~ Theoden, Lord of the Rings - The Two Towers

## Progress

The second week of the coding period involved a lot of pair programming with [Vicente](https://twitter.com/parradeadlock), the creator of [MetaCall.io](https://twitter.com/metacallio) who is mentoring me alongside my GSoC Mentor [Gill](https://github.com/giarve). After the initial kernel was set up, we decided to take a look at how we can embed the MetaCall APIs into the kernel.

MetaCall provides two high-level APIs to load the code into its polyglot runtime and execute the same. The `metacall_load_from_file` API allows us to load the script from a file present in a directory and execute the same. The `metacall_load_from_memory` API allows to execute the code by passing it as a string directly from the memory, without saving the same in a file.

While it was initially decided that we wished to go with the `metacall_load_from_file` API, we quickly turned the specification towards using the `metacall_load_from_memory` API to make it easy for us to load and execute the code. However this is where the first major blocker was encountered.

![image](and-it-happens.gif)

> And it just happens ¯\_(ツ)_/¯

MetaCall’s [Polyglot runtime](https://metacall.io/doc.html#/) behaves quite differently than [Python's actual runtime](https://docs.python.org/3/library/python.html). It simply means that a standard Python script, which would be executed by the Python runtime, would behave quite differently compared to the same execution carried on the MetaCall’s runtime. Let’s take an example for the same. Suppose we have a file named `script.py` which contains the following snippet:

```
print(__name__)
```

Let us execute it via Python: `$ python3 script.py`

It would present the following output:

```
__main__
```

However if we execute the same script using MetaCall, using: `$ metacall script.py`

It would present the following output:

```
script.py
Script (script.py) loaded correctly
```

The __name__ variable is a special Python variable which retrieves its value depending on how we execute it. In the case of MetaCall, we needed a way to launch our Jupyter kernel, not using Python's runtime but instead MetaCall's runtime.

I made a Pull Request ([#10](https://github.com/metacall/jupyter-kernel/pull/10)) that added a `launcher.py` file that enables us to launch the Jupyter Kernel using MetaCall, which now makes it possible to embed the MetaCall APIs into the kernel and execute the code on the basis of that.

## Blockers

It would be no heresy to say that the whole week was a blocker this time!

The first blocker, as stated earlier, is how we embed the MetaCall into the kernel. Though the standard way of using the APIs is through the PyPi package and importing them up, the difference in runtimes prevent the usage of the APIs. It eventually leads the kernel to throw up multiple errors and shut down the execution overall.

There are a couple of problems with this whole approach. [MetaCall Core](https://github.com/metacall/core) doesn’t support arguments as such. Second, MetaCall uses its own versions of `pip` (and `npm` as well) to avoid polluting inter-related packages and ensure portability. This makes it impossible for MetaCall to be used with isolated environments (like [Virtual Environments](https://docs.python.org/3/tutorial/venv.html) in Python).

As we discovered multiple blockers, I worked with Vicente to find the bugs which would be then fixed by him over the Core library. During these efforts, we managed to fix the double execution problems and other bugs in the Python loader, improved error handling, mitigated minor bugs and added support for `__main__` on the Python loader.

It was also a hard struggle against finding installed packages on my Linux machine and doing hacky stuff with Vicente to find how we can run them using MetaCall's runtime. In some areas, we had success. In some, not. And we are overall keeping this as a scope to further improve on in the coming weeks.

![image](i-can-do-this.gif)

## Learnings

The second week seems to have the most defining week of my development experience so far. We were presented with a problem that was definitely beyond the scope of what we had originally planned but it overall helped us improve on the upstream project ([MetaCall Core](https://github.com/metacall/core)) and ensure that the project development continues smoothly in the coming weeks.

In the second week, I got a deeper dive into the MetaCall Core Project and I got a chance to study the [Python loader](https://github.com/metacall/core/tree/develop/source/loaders/py_loader) and the [Python port](https://github.com/metacall/core/tree/develop/source/ports/py_port). Apart from the same, I got a chance to have short and frequent debugging sessions with Vicente where we discovered bugs in the Python port and worked on fixing them.

I also got a chance to go further studying the [IPython](https://github.com/ipython/ipython) and [Notebook](https://github.com/jupyter/notebook), in the overall Jupyter spectrum to understand how the projects are shaped and how they play out. It was a welcoming and delightful experience overall, something that I would carry forward as a learning experience in the coming weeks ahead.

![image](i-m-learning.gif)

## Plans for next week

While I’m writing this blog, the third week of the Coding period is already in progress. During this week, I would like to make sure that MetaCall’s initialization is successful and scripts can be loaded and executed successfully. I would also be spending some time figuring out the language detection part. I have been planning to use `guesslang` which is a [PyPi package](https://pypi.org/project/guesslang/) that performs exceptionally, with the aid of deep learning. However its usage of data science packages like Tensorflow would affect the performance of the kernel significantly and I’m trying to find a walk-through around the same.

The second-week progress has been received positively by my mentor and the community. It has been a great experience working so far and I hope I can work even more in the coming weeks and successfully execute the project.

Signing off the second-week log about my Google Summer of Code experience!

![image](https://i.imgur.com/NDIkyfG.gif)
