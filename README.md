# Projects
An overview of John Miller's relevant projects

# ROCKIN Lab
When I joined the ROCKIN (Robotics and Computational Kinematics and Inovation) research lab at SDSMT in 2022, I started by working with the Yaskawa Motoman GP-12 Industrial Robot and PLC's before taking the intiative to learn ROS (Robot Operating Software). I started using ROS for it's simulation aspects (Gazebo, Ignition Gazebo) as we didn't have any robots in the lab that ran on ROS. I created numerous simulated robots in Gazebo and learned how to use Machine Learning algorithms to optomize their autonomous navigation. Once we got the Turtlebot3-Burger and the TurtleBot4 in the lab, I moved from simulations to real world robots. I've since created multiple autonomous programs with the Turtlebot3 and 4, in addition to creating autonomous programs that allow them to work together as a multi-robot fleet.

# TurtleBot3-Burger and TurtleBot4
TurtleBot3-Burger and TurtleBot4 are open-source robots developed and manufactured by the company ROBOTIS. They are primarily used in research applications and I am currently using both of them in the ROCKIN lab. Because the TB3 runs on ROS1 and the TB4 runs on ROS2, I have experience using both of these platforms as well as their counterparts (RVIS/RVIS2, SLAM, NAV/NAV2). This also gave me experience using the ROS1-ROS2 bridge, allowing both platforms to communicate with each other, which in turn allows them to interact with each other via the robotic arm I applied to one of the Turtlebot 4's.. My main focus in the lab is multi-robot fleet control. By creating a central map that takes lidar inputs from all of the robots we are able to make autonomous navigation much safer.

# Moonrockers
Moonrockers is the South Dakota Mines team that competes in NASA's Lunabotics competition, which involves designing a rover that can autonomously navigate rough terrain, mine Lunar material, and deposit it in a specified location. From my time with this team I have experience using depth cameras for obstacle avoidance and localization, ArUco Codes for pose estimation and localization, and building my own ROS2 packages that work with this. I also have used CAN for motor control and communication, utlizing python-can and ros2_socketcan and ros2_canopen.
# SphereWalker
SphereWalker is a hexapod walker that uses a four-bar linkage system to minamize the number of actuators needed to operate. Along with other members of ROCKIN, I am devolping a prototype of SphereWalker for NASA. As the software lead on SphereWalker, I am currently implementing ROS2(Humble) on SphereWalker. This is mainly for teleoperation, which we currently have working, and for obstacle avoidance with a RP-LiDAR scanner, which is something we are still working on. I also designed the electrical schematic for SphereWalker, which can be seen below.

![SWschematic](https://github.com/user-attachments/assets/4ca53a8a-3bbc-4c3b-8c3d-be4011b0afac)

# Astro (Unitree GO-2 EDU)
Astro, as he is affectionatley known in the lab, is a Unitree GO-2 EDU robotic dog. Since Astro comes with ROS2 Foxy on-board, I was able to comunicate with the two Turtlebot4's. Although cross distro communication is not great in ROS2, it is good enough to create a bridge that allows Astro and the Turtlebot4's to each contribute lidar data to a central map. This map allows for the three robots to localize and autonomously navigate any area far better than just one of them would be able to.

# ROS2 Bash Script for File Creation
https://github.com/John-AMiller/Generic-ROS2-file-creator-using-bash-script


