#include <iostream>
#include <stdlib.h>
#include <string.h>

using namespace std;

int main(int argc, char** argv)
{
    if (argc > 1)
    {
        string command = argv[1];

        if (command == "--help")
        {
            cout << "Argumments:" << endl;
            cout << "-i:" << endl;
            cout << "monikvideos -i input" << endl;
            cout << "--version:" << endl;
            cout << "monikvideos --version" << endl;
            
        } else if (command == "--version")
        {
            cout << "monikvideos 0.4.0" << endl;
            cout << "Fork me: https://github.com/Dev-Linux/MonikVideos" << endl;

        } else if (command == "-i" && argc > 2)
        {
            cout << argc << endl;
            char line[] = "/opt/monikvideos/monikvideos ";

            strcat(line, argv[2]);
            system(line);

        } else
        {
            cout << "Argumment unregistered!" << endl;
        }

    } else {
        system("/opt/monikvideos/monikvideos");
    }

    return 0;
}