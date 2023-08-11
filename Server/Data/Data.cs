using Server.Models;

namespace Server.Data
{
    public class Data
    {
        public static List<Kost> ListData()
        {
            List<Kost> kostList = new List<Kost>()
            {
                new Kost
                {
                    Id = 1,
                    KostName = "Kost Bapak Akbar",
                    Gambar = "https://static.mamikos.com/uploads/cache/data/style/2023-07-28/FgvlgWjw-540x720.jpg",
                    Price = 700000,
                    TypeKost = "Pria",
                    Address = "Bandung Sukaraja No.8",
                    DetailKost = new DetailKost
                    {
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        Fasilitas = new List<Fasilitas>
                        {
                            new Fasilitas
                            {
                                FasilitasKamar = new List<FasilitasKamar>
                                {
                                    new FasilitasKamar
                                    {
                                        Id = 1,
                                        NamaFasilitas = "3x3 meter"
                                    },
                                     new FasilitasKamar
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Termasuk Listrik"
                                    },
                                },
                                FasilitasToilet = new List<FasilitasToilet>
                                {
                                    new FasilitasToilet
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kamar mandi dalam"
                                    },
                                    new FasilitasToilet
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Kloset"
                                    },
                                     new FasilitasToilet
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Shower"
                                    }
                                },
                                FasilitasUmum = new List<FasilitasUmum>
                                {
                                    new FasilitasUmum
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kulkas"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Parkir Sepeda"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Parkir Motor"
                                    }
                                }
                            }
                        }
                    }
                },
                new Kost
                {
                    Id = 2,
                    KostName = "Kost Bapak Reza",
                    Gambar = "https://static.mamikos.com/uploads/cache/data/style/2023-08-03/dWB8uA46-540x720.jpg",
                    Price = 600000,
                    TypeKost = "Wanita",
                    Address = "Bandung Geger Kalong No.1",
                    DetailKost = new DetailKost
                    {
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        Fasilitas = new List<Fasilitas>
                        {
                            new Fasilitas
                            {
                                FasilitasKamar = new List<FasilitasKamar>
                                {
                                    new FasilitasKamar
                                    {
                                        Id = 1,
                                        NamaFasilitas = "3.5x3 meter"
                                    },
                                     new FasilitasKamar
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Termasuk Listrik"
                                    },
                                },
                                FasilitasToilet = new List<FasilitasToilet>
                                {
                                    new FasilitasToilet
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kamar mandi dalam"
                                    },
                                    new FasilitasToilet
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Kloset"
                                    }
                                },
                                FasilitasUmum = new List<FasilitasUmum>
                                {
                                    new FasilitasUmum
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kulkas"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Parkir Sepeda"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Parkir Motor"
                                    }
                                }
                            }
                        }
                    }
                },
                new Kost
                {
                    Id = 3,
                    KostName = "Kost Bapak Azriel",
                    Gambar = "https://static.mamikos.com/uploads/cache/data/style/2023-06-16/K0x7MsEo-540x720.jpg",
                    Price = 800000,
                    TypeKost = "Campuran",
                    Address = "Bandung Sukaraja No.8",
                    DetailKost = new DetailKost
                    {
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        Fasilitas = new List<Fasilitas>
                        {
                            new Fasilitas
                            {
                                FasilitasKamar = new List<FasilitasKamar>
                                {
                                    new FasilitasKamar
                                    {
                                        Id = 1,
                                        NamaFasilitas = "3x3 meter"
                                    },
                                     new FasilitasKamar
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Termasuk Listrik"
                                    },
                                },
                                FasilitasToilet = new List<FasilitasToilet>
                                {
                                    new FasilitasToilet
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kamar mandi dalam"
                                    },
                                    new FasilitasToilet
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Kloset"
                                    }
                                },
                                FasilitasUmum = new List<FasilitasUmum>
                                {
                                    new FasilitasUmum
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kulkas"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Parkir Sepeda"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Parkir Motor"
                                    }
                                }
                            }
                        }
                    }
                },
                new Kost
                {
                    Id = 4,
                    KostName = "Kost Bapak Helmi",
                    Gambar = "https://static.mamikos.com/uploads/cache/data/style/2023-06-16/K0x7MsEo-540x720.jpg",
                    Price = 750000,
                    TypeKost = "Pria",
                    Address = "Bandung Babakan Radio No.8",
                    DetailKost = new DetailKost
                    {
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        Fasilitas = new List<Fasilitas>
                        {
                            new Fasilitas
                            {
                                FasilitasKamar = new List<FasilitasKamar>
                                {
                                    new FasilitasKamar
                                    {
                                        Id = 1,
                                        NamaFasilitas = "3x3 meter"
                                    },
                                     new FasilitasKamar
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Termasuk Listrik"
                                    },
                                },
                                FasilitasToilet = new List<FasilitasToilet>
                                {
                                    new FasilitasToilet
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kamar mandi dalam"
                                    },
                                    new FasilitasToilet
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Kloset"
                                    }
                                },
                                FasilitasUmum = new List<FasilitasUmum>
                                {
                                    new FasilitasUmum
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kulkas"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Parkir Sepeda"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Parkir Motor"
                                    }
                                }
                            }
                        }
                    }
                },
                new Kost
                {
                    Id = 5,
                    KostName = "Kost Bapak Fauzi",
                    Gambar = "https://static.mamikos.com/uploads/cache/data/style/2023-08-03/dWB8uA46-540x720.jpg",
                    Price = 650000,
                    TypeKost = "Wanita",
                    Address = "Cimahi Pasir Kaliki No.1",
                    DetailKost = new DetailKost
                    {
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        Fasilitas = new List<Fasilitas>
                        {
                            new Fasilitas
                            {
                                FasilitasKamar = new List<FasilitasKamar>
                                {
                                    new FasilitasKamar
                                    {
                                        Id = 1,
                                        NamaFasilitas = "3.5x3 meter"
                                    },
                                     new FasilitasKamar
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Termasuk Listrik"
                                    },
                                },
                                FasilitasToilet = new List<FasilitasToilet>
                                {
                                    new FasilitasToilet
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kamar mandi dalam"
                                    },
                                    new FasilitasToilet
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Kloset"
                                    }
                                },
                                FasilitasUmum = new List<FasilitasUmum>
                                {
                                    new FasilitasUmum
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kulkas"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Parkir Sepeda"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Parkir Motor"
                                    }
                                }
                            }
                        }
                    }
                },
                new Kost
                {
                    Id = 6,
                    KostName = "Kost Mas Andri",
                    Gambar = "https://static.mamikos.com/uploads/cache/data/style/2023-07-28/FgvlgWjw-540x720.jpg",
                    Price = 750000,
                    TypeKost = "Pria",
                    Address = "Bandung Sukaraja No.8",
                    DetailKost = new DetailKost
                    {
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        Fasilitas = new List<Fasilitas>
                        {
                            new Fasilitas
                            {
                                FasilitasKamar = new List<FasilitasKamar>
                                {
                                    new FasilitasKamar
                                    {
                                        Id = 1,
                                        NamaFasilitas = "3x3 meter"
                                    },
                                     new FasilitasKamar
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Termasuk Listrik"
                                    },
                                },
                                FasilitasToilet = new List<FasilitasToilet>
                                {
                                    new FasilitasToilet
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kamar mandi dalam"
                                    },
                                    new FasilitasToilet
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Kloset"
                                    },
                                     new FasilitasToilet
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Shower"
                                    }
                                },
                                FasilitasUmum = new List<FasilitasUmum>
                                {
                                    new FasilitasUmum
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kulkas"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Parkir Sepeda"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Parkir Motor"
                                    }
                                }
                            }
                        }
                    }
                },
                new Kost
                {
                    Id = 7,
                    KostName = "Kost Bapak Arya",
                    Gambar = "https://static.mamikos.com/uploads/cache/data/style/2023-08-03/dWB8uA46-540x720.jpg",
                    Price = 680000,
                    TypeKost = "Wanita",
                    Address = "Cimahi Pasir Koja No.1",
                    DetailKost = new DetailKost
                    {
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        Fasilitas = new List<Fasilitas>
                        {
                            new Fasilitas
                            {
                                FasilitasKamar = new List<FasilitasKamar>
                                {
                                    new FasilitasKamar
                                    {
                                        Id = 1,
                                        NamaFasilitas = "3.5x3 meter"
                                    },
                                     new FasilitasKamar
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Termasuk Listrik"
                                    },
                                },
                                FasilitasToilet = new List<FasilitasToilet>
                                {
                                    new FasilitasToilet
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kamar mandi dalam"
                                    },
                                    new FasilitasToilet
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Kloset"
                                    }
                                },
                                FasilitasUmum = new List<FasilitasUmum>
                                {
                                    new FasilitasUmum
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kulkas"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Parkir Sepeda"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Parkir Motor"
                                    }
                                }
                            }
                        }
                    }
                },
                new Kost
                {
                    Id = 8,
                    KostName = "Kost Mas Hafidz",
                    Gambar = "https://static.mamikos.com/uploads/cache/data/style/2023-07-28/FgvlgWjw-540x720.jpg",
                    Price = 900000,
                    TypeKost = "Pria",
                    Address = "Bandung Pasteur No.8",
                    DetailKost = new DetailKost
                    {
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        Fasilitas = new List<Fasilitas>
                        {
                            new Fasilitas
                            {
                                FasilitasKamar = new List<FasilitasKamar>
                                {
                                    new FasilitasKamar
                                    {
                                        Id = 1,
                                        NamaFasilitas = "3x3 meter"
                                    },
                                     new FasilitasKamar
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Termasuk Listrik"
                                    },
                                },
                                FasilitasToilet = new List<FasilitasToilet>
                                {
                                    new FasilitasToilet
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kamar mandi dalam"
                                    },
                                    new FasilitasToilet
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Kloset"
                                    },
                                     new FasilitasToilet
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Shower"
                                    }
                                },
                                FasilitasUmum = new List<FasilitasUmum>
                                {
                                    new FasilitasUmum
                                    {
                                        Id = 1,
                                        NamaFasilitas = "Kulkas"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 2,
                                        NamaFasilitas = "Parkir Sepeda"
                                    },
                                    new FasilitasUmum
                                    {
                                        Id = 3,
                                        NamaFasilitas = "Parkir Motor"
                                    }
                                }
                            }
                        }
                    }
                }
            };
            return kostList;
        }
    }
}
