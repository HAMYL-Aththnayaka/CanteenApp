class FoodItem {
  final String id;
  final String name;
  final double price;
  final String description;
  final String image;
  final String category;
  final bool isHelpingHand;

  FoodItem({
    required this.id,
    required this.name,
    required this.price,
    required this.description,
    required this.image,
    required this.category,
    this.isHelpingHand = false,
  });

  factory FoodItem.fromJson(Map<String, dynamic> json) {
    return FoodItem(
      id: json['_id'] ?? '',
      name: json['name'] ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      description: json['description'] ?? '',
      image: json['image'] ?? '',
      category: json['catagory'] ?? '',
      isHelpingHand: json['isHelpingHand'] ?? false,
    );
  }
}