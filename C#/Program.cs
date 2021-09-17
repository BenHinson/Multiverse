using System;
public class Program {
    static void Main() {
        // var penguin = new Animal("mammal", "Antarctica", false);
        var penguin = new Penguin("mammal", "Antarctica", false);
        penguin.printFurLength();
        penguin.eat();

        var komodoDragon = new KomodoDragon("reptile", "Indonesia", true);
        komodoDragon.eat007Enemy();
        Console.WriteLine(komodoDragon.humansEaten);
    }
}

public class Animal {
    public string group, location;
    public bool naturallyAggressive, canFly;
    public Animal(string group, string location, bool naturallyAggressive) {
        this.group = group;
        this.location = location;
        this.naturallyAggressive = naturallyAggressive;
        canFly = false;
    }
    public void eat() {
        Console.WriteLine("Animal that is in {0} starts eating at: {1}", location, DateTime.Now.ToString("HH:mm:ss"));
    }
}

class Penguin : Animal {
    public int furLength;
    public Penguin(string group, string location, bool aggressive):base(group,location,aggressive) {
        furLength = 5;
    }
    public void printFurLength() {
        Console.WriteLine(group);
        Console.WriteLine(furLength);
        Console.WriteLine(canFly);
    }
}

class KomodoDragon : Animal {
    public int humansEaten;
    public bool venom;
    public KomodoDragon(string group, string location, bool aggressive):base(group, location, aggressive) {
        humansEaten = 0;
        venom = true;
    }

    public bool breatheFire() { Console.WriteLine("A Komodo Dragon cannot breathe fire..."); return false;  }
    public void eat007Enemy() { humansEaten++; }
}